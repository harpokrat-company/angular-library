import {TestBed} from '@angular/core/testing';

import {PasswordService} from './password.service';
import {HttpClientModule} from '@angular/common/http';

describe('PasswordService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [{
      provide: 'serverUrl',
      useValue: 'http://test'
    }]

  }));

  it('should be created', () => {
    const service: PasswordService = TestBed.get(PasswordService);
    expect(service).toBeTruthy();
  });
});
