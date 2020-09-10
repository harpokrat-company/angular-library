import {ApiService} from './api.service';
import {defer, Observable} from 'rxjs';
import {ResourceDatasource} from '../datasource/resource-datasource';
import {IMeta, IRelationships, IResource, IResourceEndpoint} from '@harpokrat/client';

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
    readonly endpoint: IResourceEndpoint<T>,
  ) {
  }

  read(resourceId: string): Observable<IResource<T>> {
    return defer(() => this.endpoint.read(resourceId));
  }

  readAll({
            page = 1,
            size = 20,
            sort,
            sortDescending = false,
            filters = []
          }: PaginationOptions = {}): Observable<IResource<T>[]> {
    return defer(() => this.endpoint.readMany({
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
    };
    return defer(() => this.endpoint.create(resource, {meta}));
  }

  update(resourceId: string, resource: IResource<Partial<T>>, meta?: IMeta): Observable<IResource<T>> {
    return defer(() => this.endpoint.update(resourceId, resource, {meta}));
  }

  delete(resourceId: string, meta?: IMeta): Observable<void> {
    return defer(() => this.endpoint.delete(resourceId, {meta}));
  }

  asDatasource(filters: Filters): ResourceDatasource<T> {
    return new ResourceDatasource<T>(this, filters);
  }
}
