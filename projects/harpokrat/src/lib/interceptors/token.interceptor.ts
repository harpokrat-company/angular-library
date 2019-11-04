import {Inject, Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {tap} from 'rxjs/operators';

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
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(req).pipe(tap(() => {
    }, async (err: HttpErrorResponse) => {
      if (err.status === 401) {
        await this.router.navigate([this.loginRouterPath]);
      }
    }));
  }
}
