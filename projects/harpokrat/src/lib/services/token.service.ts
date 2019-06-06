import {Inject, Injectable} from '@angular/core';
import {ApiService, RequestHeaders} from './api.service';
import {ResourceService} from './resource.service';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Resource} from '../models/resource';
import {Token} from '../models/domain/token';
import {shareReplay, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenService extends ResourceService {

  constructor(apiService: ApiService,
              @Inject('serverUrl') serverUrl: string,
              private authService: AuthService) {
    super(apiService, `${serverUrl}/json-web-tokens`);
  }

  login(email: string, password: string): Observable<Resource<Token>> {
    const encoded = btoa(`${email}:${password}`);
    const header: RequestHeaders = {
      Authorization: `Basic ${encoded}`
    };
    return this.api.post<Token>(this.baseUri, null, null, header).pipe(
      tap(token => this.authService.token = token.attributes.token),
      shareReplay(1)
    );
  }
}
