import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Resource} from '../models/resource';
import {ResourceDatasource} from '../datasource/resource-datasource';
import {Relationships} from '../models/relationships';
import {Meta} from '../models/meta';
import {IResourceEndpoint} from '@harpokrat/client';
import {fromPromise} from 'rxjs/internal-compatibility';

export interface Filters {
  [key: string]: any;
}

export interface PaginationOptions {

  page?: number;

  size?: number;

  sort?: string;

  sortDescending?: boolean;

  filters?: Filters;
}

export abstract class ResourceService<T = any> {

  get baseUri() {
    return this.uri;
  }

  get api(): ApiService {
    return this.apiService;
  }

  protected constructor(
    private apiService: ApiService,
    private uri: string,
    private resourceType,
    private readonly endpoint: IResourceEndpoint<T>,
  ) {
  }

  buildUrl(path: string): string {
    let url = this.uri;
    if (url.endsWith('/')) {
      url = url.substring(0, url.length - 1);
    }
    if (path.startsWith('/')) {
      path = path.substring(1);
    }
    return url + '/' + path;
  }

  read(resourceId: string): Observable<Resource<T>> {
    return fromPromise(this.endpoint.read(resourceId));
  }

  readAll({
            page = 0,
            size = 20,
            sort,
            sortDescending = false,
            filters = []
          }: PaginationOptions = {}): Observable<Resource<T>[]> {
    return fromPromise(this.endpoint.readMany({
      page,
      size,
      sort,
      sortDescending,
      filters,
    }));
  }

  create(attributes?: T, relationships?: Relationships, meta?: Meta): Observable<Resource<T>> {
    const resource = Resource.of(attributes, this.resourceType, relationships, meta);
    return fromPromise(this.endpoint.create(resource));
  }

  update(resourceId: string, resource: Resource<Partial<T>>, meta?: Meta): Observable<Resource<T>> {
    return fromPromise(this.endpoint.update(resourceId, resource, {meta}));
  }

  delete(resourceId: string, meta?: Meta): Observable<void> {
    return fromPromise(this.endpoint.delete(resourceId, {meta}));
  }

  asDatasource(filters: Filters): ResourceDatasource<T> {
    return new ResourceDatasource<T>(this, filters);
  }
}
