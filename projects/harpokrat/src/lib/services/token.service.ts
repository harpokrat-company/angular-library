import {Inject, Injectable} from '@angular/core';
import {ApiService, RequestHeaders} from './api.service';
import {ResourceService} from './resource.service';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Resource} from '../models/resource';
import {Token} from '../models/domain/token';
import {flatMap, shareReplay, tap} from 'rxjs/operators';
import {HclwService} from "@harpokrat/hcl";

@Injectable({
  providedIn: 'root'
})
export class TokenService extends ResourceService {

  constructor(apiService: ApiService,
              @Inject('serverUrl') serverUrl: string,
              private authService: AuthService,
              private readonly $hclwService: HclwService,
  ) {
    super(apiService, `${serverUrl}/json-web-tokens`, 'tokens');
  }

  login(email: string, password: string): Observable<Resource<Token>> {
    return this.$hclwService.getBasicAuth(email, password).pipe(
      flatMap((basic) => this.api.post<Token>(this.baseUri, null, null, {
        'Authorization': basic,
      }).pipe(
        tap(token => this.authService.token = token),
        shareReplay(1)
      )),
    );
  }
}
