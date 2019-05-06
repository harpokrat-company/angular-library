import {TestBed} from '@angular/core/testing';

import {TokenService} from './token.service';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from './user.service';

const URL = 'http://test';

describe('TokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [{
      provide: 'serverUrl',
      useValue: URL
    }]

  }));

  it('should be created', () => {
    const service: TokenService = TestBed.get(TokenService);
    expect(service).toBeTruthy();
  });

  it('should have the correct uri', () => {
    const service: UserService = TestBed.get(TokenService);
    expect(service.baseUri).toEqual(`${URL}/json-web-tokens`);
  });
});
