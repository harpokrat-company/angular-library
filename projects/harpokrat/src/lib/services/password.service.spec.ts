import {TestBed} from '@angular/core/testing';

import {PasswordService} from './password.service';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from './user.service';

const URL = 'http://test';

describe('PasswordService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [{
      provide: 'serverUrl',
      useValue: URL
    }]
  }));

  it('should be created', () => {
    const service: PasswordService = TestBed.get(PasswordService);
    expect(service).toBeTruthy();
  });

  it('should have the correct uri', () => {
    const service: UserService = TestBed.get(PasswordService);
    expect(service.baseUri).toEqual(`${URL}/passwords`);
  });
});
