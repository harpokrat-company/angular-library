import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Response} from '../models/response';
import {Injectable} from '@angular/core';

type QueryParams = HttpParams | { [param: string]: string | string[] };
type RequestHeaders = HttpHeaders | { [param: string]: string | string[] };

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService<R = any> {

  protected constructor(private httpClient: HttpClient,
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

  request<T = R>(method: string, path?: string, options?: {
    body?: any;
    headers?: RequestHeaders,
    params?: QueryParams
  }): Observable<Response<T>> {
    const url = path ? this.buildUrl(path) : this.uri;
    return this.httpClient.request<Response<T>>(method, url, options);
  }

  get<T = R>(path?: string, params?: QueryParams, headers?: HttpHeaders): Observable<Response<T>> {
    return this.request<T>('GET', path, {params, headers});
  }

  post<T = R>(body?: any, path?: string, params?: QueryParams, headers?: HttpHeaders): Observable<Response<T>> {
    return this.request<T>('POST', path, {body, params, headers});
  }

  put<T = R>(body?: any, path?: string, params?: QueryParams, headers?: HttpHeaders): Observable<Response<T>> {
    return this.request<T>('PUT', path, {body, params, headers});
  }

  delete<T = R>(path?: string, params?: QueryParams, headers?: HttpHeaders): Observable<Response<T>> {
    return this.request<T>('DELETE', path, {params, headers});
  }
}
