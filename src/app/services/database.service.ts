import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, filter, map, Observable, of, Subject, switchMap, tap} from 'rxjs';
import {IDeck, IUser} from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private baseUrl = 'http://localhost:3000';
  public decksChanged = new Subject<void>();

  constructor(private _http: HttpClient) {
  }

  getDecks(): Observable<IDeck[]> {
    return this._http.get<IDeck[]>(`${this.baseUrl}/decks`);
  }

  addDeck(deck: IDeck): Observable<IDeck> {
    this.decksChanged.next();
    return this._http.post<IDeck>(`${this.baseUrl}/decks`, deck)
      .pipe(
        tap(() => {
          this.decksChanged.next();
        })
      );
  }

  updateDeck(deck: IDeck): Observable<IDeck> {
    const url = `${this.baseUrl}/decks/${deck.id}`
    this.decksChanged.next();
    return this._http.put<IDeck>(url, deck)
      .pipe(
        tap(() => {
          this.decksChanged.next();
        })
      );
  }

  removeDeck(deckId: string): Observable<IDeck> {
    const url = `${this.baseUrl}/decks/${deckId}`;
    return this._http.delete<IDeck>(url)
      .pipe(
        tap(() => {
          this.decksChanged.next();
        })
      );
  }

  getUserByEmail(email: string): Observable<IUser> {
    const url = `${this.baseUrl}/users?email=${email}`;

    return this._http.get<IUser[]>(url)
      .pipe(
        map(users => users.length > 0 ? users[0] : null),
        catchError(error => {
          console.error(error);
          return of(null);
        }),
        filter(user => user !== null),
        switchMap(user => of(user as IUser))
      );
  }

  getAllUsers(): Observable<IUser[]> {
    const url = `${this.baseUrl}/users`;

    return this._http.get<IUser[]>(url);
  }

  addNewUser(user: IUser) {
    return this._http.post<IUser>(`${this.baseUrl}/users`, user);
  }
}
