import {Inject, Injectable} from '@angular/core';
import {ResourceService} from './resource.service';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ResourceService {

  constructor(apiService: ApiService,
              @Inject('serverUrl') serverUrl: string) {
    super(apiService, `${serverUrl}/users`);
  }
}
