import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import * as bcrypt from 'bcryptjs';
import { IUser } from '../../interfaces/interfaces';
import {DatabaseService} from "./database.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  private _allUsers$ = new BehaviorSubject<IUser[] | null>(null);
  private _loginStatusKey = 'loginStatus';

  navigatedFrom$ = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private _dbService: DatabaseService, private _router: Router) {
    this.getUsers();
  }

  get isLoggedIn(): boolean {
    const loggedInData = this.getLoggedInData();
    return loggedInData?.isLoggedIn ?? false;
  }

  get loggedInUserId(): string | null {
    const loggedInData = this.getLoggedInData();
    return loggedInData?.userId ?? null;
  }

  getUsers() {
    this._dbService.getAllUsers().subscribe((data) => {
      if (data) {
        this._allUsers$.next(data);
      }
    })
  }

  async register(userName: string, email: string, password: string) {
    console.log(this._allUsers$.value)

    if (this.emailIsUnique(email)) {
      const userId = this.generateId();
      const hashedPassword = await bcrypt.hash(password, 10);

      const user: IUser = {
        id: userId,
        username: userName,
        email: email,
        password: hashedPassword
      };

      this._dbService.addNewUser(user).subscribe(() => {
        this._router.navigate(['/']);
      }, (error) => {
        console.error('Error adding new user: ', error);
      })

    } else {
      console.log('This email is already used!');
    }
  }

  async login(email: string, password: string) {
    const user = this.findUserByEmail(email);

    if (user) {
      const passwordMatches = await bcrypt.compare(password, user.password);

      if (passwordMatches) {
        const loggedInData = {
          isLoggedIn: true,
          userId: user.id,
        };
        sessionStorage.setItem(this._loginStatusKey, JSON.stringify(loggedInData));
        this.decideNextNavigation()
      } else {
        alert('password does not match!')
      }
    } else {
      alert('user not found!')
    }
  }
  logout() {
    sessionStorage.removeItem(this._loginStatusKey);
    this._router.navigate(['/login']);
  }

  emailIsUnique(email: string): boolean {
    return !this._allUsers$.value?.filter(user => user.email === email)[0];
  }

  findUserByEmail(email: string): IUser | null {
    console.log('all users:', this._allUsers$.value);
    const user = this._allUsers$.value?.find((user) => user.email === email);
    console.log('found user:', user);
    return user || null;
  }

  generateId(): string {
    const random = Math.random();
    const timestampString = new Date().getTime().toString();
    return `${timestampString}_${random}`;
  }

  private getLoggedInData(): { isLoggedIn: boolean, userId: string } | null {
    const loggedInDataJson = sessionStorage.getItem(this._loginStatusKey);
    return loggedInDataJson ? JSON.parse(loggedInDataJson) : null;
  }

  decideNextNavigation(): void {
    console.log('checkNextNavigation: ', this.navigatedFrom$.value);
    if (this.navigatedFrom$.value === 'decks') {
      this.navigatedFrom$.next('');
      this._router.navigate(['/decks']);
    } else {
      this._router.navigate(['/']);
    }
  }
}
