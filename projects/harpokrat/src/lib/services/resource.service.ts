import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Resource} from '../models/resource';
import {ResourceDatasource} from "../datasource/resource-datasource";
import {Datasource} from "../datasource/datasource";
import {Relationships} from "../models/relationships";

export interface PaginationOptions {

  page?: number;

  size?: number;

  sort?: string;

  sortDescending?: boolean;
}

export abstract class ResourceService<T = any> {

  get baseUri() {
    return this.uri;
  }

  get api(): ApiService {
    return this.apiService;
  }

  protected constructor(private apiService: ApiService,
                        private uri: string,
                        private resourceType) {
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
    return this.apiService.get<T>(this.buildUrl(resourceId));
  }

  readAll({page = 0, size = 20, sort = undefined, sortDescending = false}: PaginationOptions = {}): Observable<Resource<T>[]> {
    const params = {
      'page[number]': (page + 1).toFixed(),
      'page[size]': size.toFixed(),
    };
    if (sort) {
      params['sort'] = sortDescending ? `-${sort}` : sort;
    }
    return this.apiService.getMany<T>(this.uri, params);
  }

  create(attributes?: T, relationships?: Relationships): Observable<Resource<T>> {
    const resource = Resource.of(attributes, this.resourceType, relationships);
    return this.apiService.post<T>(this.uri, resource);
  }

  update(resourceId: string): Observable<Resource<T>> {
    return this.apiService.patch<T>(this.buildUrl(resourceId));
  }

  delete(resourceId: string): Observable<Resource<null>> {
    return this.apiService.delete(this.buildUrl(resourceId));
  }

  asDatasource(): Datasource<T> {
    return new ResourceDatasource<T>(this);
  }
}
