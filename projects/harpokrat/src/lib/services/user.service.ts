import {Inject, Injectable} from '@angular/core';
import {ResourceService} from './resource.service';
import {ApiService} from './api.service';
import {IUser} from '@harpokrat/client';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ResourceService<IUser> {

  constructor(apiService: ApiService,
              @Inject('serverUrl') serverUrl: string) {
    super(apiService, 'users', apiService.client.users);
  }
}
