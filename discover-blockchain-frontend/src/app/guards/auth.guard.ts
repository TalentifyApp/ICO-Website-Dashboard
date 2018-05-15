import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
      /**
       * Logged in so return true
       */
      return true;
    }

    /**
     * Not logged in so redirect to login page with return URL
     */
    this.router.navigate(['/sign-in'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
