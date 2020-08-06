import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PrimaryData, Response} from '../models/response';
import {Inject, Injectable} from '@angular/core';
import {Resource} from '../models/resource';
import {map, shareReplay} from 'rxjs/operators';
import {Meta} from '../models/meta';
import {HarpokratApi, IHarpokratApi} from '@harpokrat/client';

export type QueryParams = HttpParams | { [param: string]: string | string[] };
export type RequestHeaders = HttpHeaders | { [param: string]: string | string[] };

export interface RequestOptions {
  params?: QueryParams;
  headers?: RequestHeaders;
  meta?: Meta;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly client: IHarpokratApi;

  protected constructor(
    private httpClient: HttpClient,
    @Inject('serverUrl') private readonly serverUrl: string,
  ) {
    this.client = new HarpokratApi({
      apiUrl: this.serverUrl,
      requester: <T>(url, options) => {
        console.log('REQUEST: ' + url);
        return this.httpClient.request<T>(options.method || 'GET', url, {
          headers: new HttpHeaders(options.headers),
          body: options.body && JSON.stringify(options.body),
          params: options.searchParams,
        }).toPromise();
      }
    });
  }
}
