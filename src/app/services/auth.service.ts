import { Injectable } from "@angular/core";
import { auth } from "../routes";
import { HttpClient } from "@angular/common/http";
import { Timestamp } from "../models";
import { ActivatedRoute, Router } from "@angular/router";

const TOKEN = 'token';
const USER_NAME = 'name';
@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  login(username: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
        this.http.post<AuthResponse>(auth, {
          username,
          password
        })
          .subscribe(response => {
            if (response) {
              sessionStorage.setItem(USER_NAME, response.name);
              sessionStorage.setItem(TOKEN, response.token);
              this.router.navigate([this.route.snapshot.queryParams['returnUrl']]);
              resolve(true);
            } else {
              alert('Authentication failed.');
              resolve(false);
            }
      }, () => {
          resolve(false);
      });
    });
  }

  logout() {
    sessionStorage.removeItem(USER_NAME);
    sessionStorage.removeItem(TOKEN);
    this.router.navigate(['']);
  }

  get userName() {
    return sessionStorage.getItem(USER_NAME);
  }

  getToken() {
    return sessionStorage.getItem(TOKEN);
  }
}

interface AuthResponse {
  name: string;
  token: string;
  expirationDate: Timestamp
}
