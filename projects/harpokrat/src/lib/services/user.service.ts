import {Inject, Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService {

  constructor(httpClient: HttpClient,
              @Inject('servcerUrl') serverUrl: string) {
    super(httpClient, `${serverUrl}/users`);
  }
}
