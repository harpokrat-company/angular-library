import {Inject, Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {ResourceService} from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService extends ResourceService {

  constructor(apiService: ApiService, @Inject('serverUrl') serverUrl: string) {
    super(apiService, `${serverUrl}/json-web-tokens`);
  }
}
