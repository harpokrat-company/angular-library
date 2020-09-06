import {Inject, Injectable} from '@angular/core';
import {ResourceService} from './resource.service';
import {ApiService} from './api.service';
import {ISecureAction} from '@harpokrat/client';

@Injectable({
  providedIn: 'root'
})
export class SecureActionService extends ResourceService<ISecureAction> {

  constructor(
    apiService: ApiService,
    @Inject('serverUrl') serverUrl: string
  ) {
    super(apiService, 'secure-actions', apiService.client.secureActions);
  }
}
