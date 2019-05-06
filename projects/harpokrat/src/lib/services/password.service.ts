import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordService extends ApiService {

  constructor(httpClient: HttpClient,
              @Inject('serverUrl') serverUrl: string) {
    super(httpClient, `${serverUrl}/passwords`);
  }
}
