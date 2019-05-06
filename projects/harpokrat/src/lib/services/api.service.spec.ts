import {TestBed} from '@angular/core/testing';

import {ApiService} from './api.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
class ApiServiceImplMock extends ApiService {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'http://localhost:8080');
  }
}

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiServiceImplMock);
    expect(service).toBeTruthy();
  });
});

