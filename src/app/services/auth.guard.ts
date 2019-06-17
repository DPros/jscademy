import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private auth: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.getToken()) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return name
    this.router.navigate(['/auth'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
