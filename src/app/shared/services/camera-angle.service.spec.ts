import { TestBed } from '@angular/core/testing';

import { CameraAngleService } from './camera-angle.service';

describe('CameraAngleService', () => {
  let service: CameraAngleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CameraAngleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
