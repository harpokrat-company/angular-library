import {TestBed} from '@angular/core/testing';

import {ApiService} from './api.service';
import {HttpClientModule} from '@angular/common/http';

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [{
      provide: 'serverUrl',
      useValue: 'http://test'
    }]
  }));

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });
});
