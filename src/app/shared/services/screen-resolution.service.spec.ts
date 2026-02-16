import { TestBed } from '@angular/core/testing';

import { ScreenResolutionService } from './screen-resolution.service';

describe('ScreenResolutionService', () => {
  let service: ScreenResolutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenResolutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
