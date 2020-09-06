import {Inject, Injectable} from '@angular/core';
import {ResourceService} from './resource.service';
import {IGroup, IVault} from '@harpokrat/client';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class VaultService extends ResourceService<IVault> {

  constructor(
    apiService: ApiService,
    @Inject('serverUrl') serverUrl: string,
  ) {
    super(apiService, 'vaults', apiService.client.vaults);
  }
}
