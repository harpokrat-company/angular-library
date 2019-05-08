import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(@Inject('loginRouterPath') private readonly loginRouterPath: string,
              private readonly authService: AuthService,
              private readonly router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.token;
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `${token}`
        }
      });
      return next.handle(req);
    } else {
      this.router.navigate([this.loginRouterPath]);
      return EMPTY;
    }
  }
}
