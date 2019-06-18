import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  hidePassword = true;
  showLoginFailed = false;

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthService
  ) {
  }

  login() {
    const {username, password} = this.form.value;
    this.authService.login(username, password)
      .then(success => {
        this.showLoginFailed = !success;
      });
  }

  resetFormAfterLoginFail(): void {
    if (this.showLoginFailed) {
      this.showLoginFailed = false;
    }
  }
}
