import {Inject, Injectable} from '@angular/core';
import {ResourceService} from './resource.service';
import {IGroup} from '@harpokrat/client';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends ResourceService<IGroup> {

  constructor(
    apiService: ApiService,
    @Inject('serverUrl') serverUrl: string,
  ) {
    super(apiService, 'groups', apiService.client.groups);
  }
}
