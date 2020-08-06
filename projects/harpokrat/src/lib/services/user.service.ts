import {Inject, Injectable} from '@angular/core';
import {ResourceService} from './resource.service';
import {ApiService} from './api.service';
import {User} from '../models/domain/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ResourceService<User> {

  constructor(apiService: ApiService,
              @Inject('serverUrl') serverUrl: string) {
    super(apiService, `${serverUrl}/users`, 'users', apiService.client.users);
  }
}
