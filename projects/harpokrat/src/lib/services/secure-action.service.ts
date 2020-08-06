import {Inject, Injectable} from '@angular/core';
import {ResourceService} from './resource.service';
import {SecureAction} from '../models/domain/secure-action';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SecureActionService extends ResourceService<SecureAction> {

  constructor(
    apiService: ApiService,
    @Inject('serverUrl') serverUrl: string
  ) {
    super(apiService, `${serverUrl}/secure-actions`, 'secure-actions', apiService.client.secureActions);
  }
}
