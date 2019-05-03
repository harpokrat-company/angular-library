import { TestBed } from '@angular/core/testing';

import { HarpokratService } from './harpokrat.service';

describe('HarpokratService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HarpokratService = TestBed.get(HarpokratService);
    expect(service).toBeTruthy();
  });
});
