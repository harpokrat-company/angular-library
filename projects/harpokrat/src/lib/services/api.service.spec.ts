import {TestBed} from '@angular/core/testing';

import {ApiService} from './api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Resource} from '../models/resource';
import {Response} from '../models/response';

const URL = 'http://localhost:8080';

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });

  describe('GET method', () => {
    it('should perform an http GET request and retrieve data', () => {
      const service: ApiService = TestBed.get(ApiService);
      const http: HttpTestingController = TestBed.get(HttpTestingController);
      const responseBody = Resource.of({value: 'test'});
      service.get(URL).subscribe((value => {
        expect(value.data).toEqual(responseBody);
      }));
      const httpHandler = http.expectOne(URL);
      expect(httpHandler.request.method).toEqual('GET');
      expect(httpHandler.request.body).toBeFalsy();
      httpHandler.flush(new Response(responseBody));
    });
  });

  describe('POST method', () => {
    it('should perform an http POST request and retrieve data', () => {
      const service: ApiService = TestBed.get(ApiService);
      const http: HttpTestingController = TestBed.get(HttpTestingController);
      const body = Resource.of({value: 'test'});
      const responseBody = Resource.of({value: 'body'});
      service.post(URL, body).subscribe((value => {
        expect(value.data).toEqual(responseBody);
      }));
      const httpHandler = http.expectOne(URL);
      expect(httpHandler.request.method).toEqual('POST');
      expect(httpHandler.request.body).toEqual(body);
      httpHandler.flush(new Response(responseBody));
    });
  });

  describe('PUT method', () => {
    it('should perform an http PUT request and retrieve data', () => {
      const service: ApiService = TestBed.get(ApiService);
      const http: HttpTestingController = TestBed.get(HttpTestingController);
      const body = Resource.of({value: 'test'});
      const responseBody = Resource.of({value: 'body'});
      service.put(URL, body).subscribe((value => {
        expect(value.data).toEqual(responseBody);
      }));
      const httpHandler = http.expectOne(URL);
      expect(httpHandler.request.method).toEqual('PUT');
      expect(httpHandler.request.body).toEqual(body);
      httpHandler.flush(new Response(responseBody));
    });
  });

  describe('PATCH method', () => {
    it('should perform an http PATCH request and retrieve data', () => {
      const service: ApiService = TestBed.get(ApiService);
      const http: HttpTestingController = TestBed.get(HttpTestingController);
      const body = Resource.of({value: 'test'});
      const responseBody = Resource.of({value: 'body'});
      service.patch(URL, body).subscribe((value => {
        expect(value.data).toEqual(responseBody);
      }));
      const httpHandler = http.expectOne(URL);
      expect(httpHandler.request.method).toEqual('PATCH');
      expect(httpHandler.request.body).toEqual(body);
      httpHandler.flush(new Response(responseBody));
    });
  });

  describe('DELETE method', () => {
    it('should perform an http DELETE request', () => {
      const service: ApiService = TestBed.get(ApiService);
      const http: HttpTestingController = TestBed.get(HttpTestingController);
      service.delete(URL).subscribe((value => {
        expect(value.data).toBeFalsy();
      }));
      const httpHandler = http.expectOne(URL);
      expect(httpHandler.request.method).toEqual('DELETE');
      expect(httpHandler.request.body).toBeFalsy();
      httpHandler.flush(new Response());
    });
  });
});

