import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    @Inject('loginRouterPath') private readonly loginRouterPath: string,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.authenticatedObservable.pipe(
      switchMap(async (isLoggedIn) => {
        if (!isLoggedIn) {
          await this.router.navigate([this.loginRouterPath], {
            queryParams: {
              redirect: state.url,
            }
          });
          return false;
        }
        return true;
      }),
    );
  }
}
