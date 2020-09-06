import {Inject, Injectable} from '@angular/core';
import {ResourceService} from './resource.service';
import {IOrganization} from '@harpokrat/client';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService extends ResourceService<IOrganization> {

  constructor(
    apiService: ApiService,
    @Inject('serverUrl') serverUrl: string,
  ) {
    super(apiService, 'organizations', apiService.client.organizations);
  }
}
