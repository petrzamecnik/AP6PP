import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
import {EInputLabelType, LabelInputComponent} from "../label-input/label-input.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @ViewChild('emailInput') emailInput!: any;
  @ViewChild('passwordInput') passwordInput!: any;
  userEmailValue: string = '';
  passwordValue: string = '';

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
  }

  login(): void {
    const email = this.userEmailValue.trim();
    const password = this.passwordValue.trim();

    console.log('email: ', email);
    console.log('password: ', password);

    const previousRouteUrl = this._activatedRoute.snapshot.queryParams['returnUrl'];
    const isNavigatingFromDecksComponent = previousRouteUrl && previousRouteUrl.startsWith('/decks');

    this._authService.login(email, password);
  }


  redirectToRegister() {
    this._router.navigate(['/register']);
  }

  logout() {
    this._authService.logout();
  }

  protected readonly EInputLabelType = EInputLabelType;

  onEmailInputChange(inputValue: string) {
    this.userEmailValue = inputValue;
  }

  onPasswordInputChange(inputValue: string) {
    this.passwordValue = inputValue;
  }
}
