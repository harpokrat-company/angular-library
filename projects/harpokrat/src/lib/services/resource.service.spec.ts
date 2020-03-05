import {TestBed} from '@angular/core/testing';

import {ResourceService} from './resource.service';
import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

const URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
class ResourceServiceMock extends ResourceService<{ value: string }> {

  constructor(apiService: ApiService) {
    super(apiService, URL, 'aled');
  }
}

describe('ResourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: ResourceServiceMock = TestBed.get(ResourceServiceMock);
    expect(service).toBeTruthy();
  });
});
