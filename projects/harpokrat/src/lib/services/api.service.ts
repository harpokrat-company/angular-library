import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PrimaryData, Response} from '../models/response';
import {Injectable} from '@angular/core';
import {Resource} from '../models/resource';
import {map, shareReplay} from 'rxjs/operators';
import {Meta} from "../models/meta";

export type QueryParams = HttpParams | { [param: string]: string | string[] };
export type RequestHeaders = HttpHeaders | { [param: string]: string | string[] };

export type RequestOptions = {
  params?: QueryParams,
  headers?: RequestHeaders,
  meta?: Meta,
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  protected constructor(private httpClient: HttpClient) {
  }

  request<T = any, DataT extends PrimaryData<T> = Resource<T>>(method: string, url: string, options?: {
    body?: any;
    headers?: RequestHeaders,
    params?: QueryParams,
    meta?: Meta
  }): Observable<DataT> {
    if (options.body != null) {
      options.body = Response.of(options.body);
    }
    return this.httpClient.request<Response<T, DataT>>(method, url, options).pipe(
      map(res => res.data),
      shareReplay(1)
    );
  }

  get<T = any>(url: string, {params, headers}: RequestOptions = {}): Observable<Resource<T>> {
    return this.request<T, Resource<T>>('GET', url, {params, headers});
  }

  getMany<T = any>(url: string, {params, headers}: RequestOptions = {}): Observable<Resource<T>[]> {
    return this.request<T, Resource<T>[]>('GET', url, {params, headers});
  }

  post<T = any>(url: string, body?: Resource<T>, {params, headers, meta}: RequestOptions = {}): Observable<Resource<T>> {
    return this.request<T, Resource<T>>('POST', url, {body, params, headers, meta});
  }

  patch<T = any>(url: string, body?: any, {params, headers, meta}: RequestOptions = {}): Observable<Resource<T>> {
    return this.request<T, Resource<T>>('PATCH', url, {body, params, headers, meta});
  }

  put<T = any>(url: string, body?: any, {params, headers, meta}: RequestOptions = {}): Observable<Resource<T>> {
    return this.request<T, Resource<T>>('PUT', url, {body, params, headers, meta});
  }

  delete(url: string, {params, headers, meta}: RequestOptions = {}): Observable<Resource<null>> {
    return this.request<null, Resource<null>>('DELETE', url, {params, headers, meta});
  }
}
