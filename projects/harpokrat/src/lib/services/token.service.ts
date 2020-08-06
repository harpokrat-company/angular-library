import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Resource} from '../models/resource';
import {Token} from '../models/domain/token';
import {shareReplay, tap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private readonly apiService: ApiService,
    private readonly authService: AuthService,
  ) {
  }

  login(email: string, password: string): Observable<Resource<Token>> {
    this.apiService.client.auth = {
      email,
      password,
    };
    return fromPromise(
      this.apiService.client.jsonWebTokens.create(),
    ).pipe(
      tap(token => this.authService.token = token),
      shareReplay(1),
    );
  }
}
