import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {ResourceDatasource} from '../datasource/resource-datasource';
import {IMeta, IRelationships, IResource, IResourceEndpoint} from '@harpokrat/client';
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

  get api(): ApiService {
    return this.apiService;
  }

  protected constructor(
    private apiService: ApiService,
    private resourceType,
    private readonly endpoint: IResourceEndpoint<T>,
  ) {
  }

  read(resourceId: string): Observable<IResource<T>> {
    return fromPromise(this.endpoint.read(resourceId));
  }

  readAll({
            page = 0,
            size = 20,
            sort,
            sortDescending = false,
            filters = []
          }: PaginationOptions = {}): Observable<IResource<T>[]> {
    return fromPromise(this.endpoint.readMany({
      page,
      size,
      sort,
      sortDescending,
      filters,
    }));
  }

  create(attributes?: T, relationships?: IRelationships, meta?: IMeta): Observable<IResource<T>> {
    const resource: IResource<T> = {
      attributes,
      type: this.resourceType,
      relationships,
      meta,
    };
    return fromPromise(this.endpoint.create(resource));
  }

  update(resourceId: string, resource: IResource<Partial<T>>, meta?: IMeta): Observable<IResource<T>> {
    return fromPromise(this.endpoint.update(resourceId, resource, {meta}));
  }

  delete(resourceId: string, meta?: IMeta): Observable<void> {
    return fromPromise(this.endpoint.delete(resourceId, {meta}));
  }

  asDatasource(filters: Filters): ResourceDatasource<T> {
    return new ResourceDatasource<T>(this, filters);
  }
}
