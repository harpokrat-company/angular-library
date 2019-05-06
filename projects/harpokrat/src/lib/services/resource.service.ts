import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Resource} from '../models/resource';
import {map, share} from 'rxjs/operators';

export abstract class ResourceService<T = any> {

  get baseUri() {
    return this.uri;
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
    return this.apiService.get<T>(this.buildUrl(resourceId)).pipe(
      map(response => response.data),
      share()
    );
  }

  readAll(): Observable<Resource<T>[]> {
    return this.apiService.getMany<T>(this.uri).pipe(
      map(response => response.data),
      share()
    );
  }

  create(): Observable<Resource<T>> {
    return this.apiService.post<T>(this.uri).pipe(
      map(response => response.data),
      share()
    );
  }

  update(resourceId: string): Observable<Resource<T>> {
    return this.apiService.patch<T>(this.buildUrl(resourceId)).pipe(
      map(response => response.data),
      share()
    );
  }

  delete(resourceId: string): Observable<Resource<null>> {
    return this.apiService.delete(this.buildUrl(resourceId)).pipe(
      map(response => response.data),
      share()
    );
  }
}
