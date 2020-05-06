import { TestBed } from '@angular/core/testing';

import { SecureActionService } from './secure-action.service';

describe('SecureActionService', () => {
  let service: SecureActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecureActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
