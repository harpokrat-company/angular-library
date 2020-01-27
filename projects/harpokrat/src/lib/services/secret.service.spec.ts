import {TestBed} from '@angular/core/testing';

import {SecretService} from './secret.service';
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
    const service: SecretService = TestBed.get(SecretService);
    expect(service).toBeTruthy();
  });

  it('should have the correct uri', () => {
    const service: UserService = TestBed.get(SecretService);
    expect(service.baseUri).toEqual(`${URL}/secrets`);
  });
});
