import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable()
export class TokenEnricherInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();
    return next.handle(token
      ? request.clone({
        setHeaders: {
          'auth_token': this.auth.getToken()
        }
      })
      : request);
  }
}
