import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userNameValue: string = '';
  userEmailValue: string = '';
  passwordValue: string = '';

  private _emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  constructor(private _authService: AuthService) {
  }

  ngOnInit(): void {
  }

  register() {

    const userName = this.userNameValue.trim();
    const email = this.userEmailValue.trim();
    const password = this.passwordValue.trim();


    if (this.userNameValue !== '' && this.userEmailValue !== '' && this.passwordValue !== '') {

      console.log('username: ', userName);
      console.log('email: ', email);
      console.log('password: ', password);

      this._authService.register(userName, email, password);

    }
  }
}
