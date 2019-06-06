import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Resource} from '../models/resource';

export abstract class ResourceService<T = any> {

  get baseUri() {
    return this.uri;
  }

  get api(): ApiService {
    return this.apiService;
  }

  protected constructor(private apiService: ApiService,
                        private uri: string) {
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

  readAll(): Observable<Resource<T>[]> {
    return this.apiService.getMany<T>(this.uri);
  }

  create(attributes?: T): Observable<Resource<T>> {
    const resource = Resource.of(attributes);
    return this.apiService.post<T>(this.uri, resource);
  }

  update(resourceId: string): Observable<Resource<T>> {
    return this.apiService.patch<T>(this.buildUrl(resourceId));
  }

  delete(resourceId: string): Observable<Resource<null>> {
    return this.apiService.delete(this.buildUrl(resourceId));
  }
}
