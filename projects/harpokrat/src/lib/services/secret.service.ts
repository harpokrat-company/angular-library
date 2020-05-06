import {Inject, Injectable} from '@angular/core';
import {PaginationOptions, ResourceService} from './resource.service';
import {ApiService} from './api.service';
import {Secret} from "../models/domain/secret";
import {combineLatest, Observable} from "rxjs";
import {HclwService, Secret as ReadableSecret} from '@harpokrat/hcl';
import {AuthService} from "./auth.service";
import {ResourceIdentifier} from "../models/resource-identifier";
import {Resource} from "../models/resource";
import {map, switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SecretService extends ResourceService<Secret> {

  constructor(apiService: ApiService,
              private readonly $authService: AuthService,
              private readonly $hclwService: HclwService,
              @Inject('serverUrl') serverUrl: string,
  ) {
    super(apiService, `${serverUrl}/secrets`, 'secrets');
  }

  getManyReadableSecrets(options: PaginationOptions): Observable<Resource<ReadableSecret>[]> {
    const filters = options.filters || {};
    filters['owner.id'] = (this.$authService.currentUser as ResourceIdentifier).id;
    options.filters = filters;
    return this.readAll(options).pipe(
      switchMap((resources) => combineLatest(
        resources.map((r) => this.makeReadableResource(r)),
      )),
    );
  }

  getReadableSecret(id: string): Observable<Resource<ReadableSecret>> {
    return this.read(id).pipe(
      switchMap((resource) => this.makeReadableResource(resource)),
    );
  }

  makeReadable(secret: Secret): Observable<ReadableSecret> {
    return this.$hclwService.createSecret(this.$authService.key, secret.content);
  }

  makeReadableResource(resource: Resource<Secret>): Observable<Resource<ReadableSecret>> {
    return this.makeReadable(resource.attributes).pipe(
      map((s) => ({...resource, attributes: s}))
    );
  }
}
