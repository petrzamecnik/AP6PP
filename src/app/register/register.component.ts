import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  userNameValue: string = '';
  userEmailValue: string = '';
  passwordValue: string = '';

  private _emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  constructor(private _authService: AuthService, private _router: Router) {
  }


  register() {

    const userName = this.userNameValue.trim();
    const email = this.userEmailValue.trim();
    const password = this.passwordValue.trim();


    if (this.userNameValue !== '' && this.userEmailValue !== '' && this.passwordValue !== '') {
      this._authService.register(userName, email, password);
      this._authService.navigatedFrom$.next('');

      this._router.navigate(['/login']);
    }
  }

  onUserNameInputChange(inputValue: string) {
    this.userNameValue = inputValue;
  }

  onEmailInputChange(inputValue: string) {
    this.userEmailValue = inputValue;
  }

  onPasswordInputChange(inputValue: string) {
    this.passwordValue = inputValue;
  }

  cancel() {
    this.userNameValue = '';
    this.userEmailValue = '';
    this.passwordValue = '';
    this._router.navigate(['/login']);
  }
}
