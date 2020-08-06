import {Inject, Injectable} from '@angular/core';
import {ResourceService} from './resource.service';
import {ApiService} from './api.service';
import {Secret} from '../models/domain/secret';

@Injectable({
  providedIn: 'root'
})
export class SecretService extends ResourceService<Secret> {

  constructor(
    apiService: ApiService,
    @Inject('serverUrl') serverUrl: string,
  ) {
    super(apiService, `${serverUrl}/secrets`, 'secrets', apiService.client.secrets);
  }
}
