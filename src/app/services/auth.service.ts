import { Injectable } from "@angular/core";
import { auth } from "../routes";
import { HttpClient } from "@angular/common/http";
import { Timestamp } from "../models";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  login(username: string, password: string) {
    this.http.post<AuthResponse>(auth, {
      username,
      password
    }).subscribe(response => {
      if (response) {
        sessionStorage.setItem('token', response.token);
        this.router.navigate([this.route.snapshot.queryParams['returnUrl']]);
      } else {
        alert("Authentication failed.")
      }
    });
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['']);
  }
}

interface AuthResponse {
  name: string;
  token: string;
  expirationDate: Timestamp
}
