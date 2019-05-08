import {TestBed} from '@angular/core/testing';

import {TokenInterceptor} from './token.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';

describe('TokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule
    ],
    providers: [
      {
        provide: 'loginRouterPath',
        useValue: '/login'
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
      }
    ]
  }));

  it('should be created', () => {
    const service: TokenInterceptor = TestBed.get(HTTP_INTERCEPTORS);
    expect(service).toBeTruthy();
  });
});
