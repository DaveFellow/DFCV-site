import { TestBed } from '@angular/core/testing';

import { StatesFactoryService } from './states-factory.service';

import * as THREE from 'three';

describe('StatesFactoryService', () => {
  let service: StatesFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: 'scene', useValue: new THREE.Scene}]
    });
    service = TestBed.inject(StatesFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should find the state', () => {
    const state = service.get('home');
    expect(state).toBeTruthy();
  });

  it('should NOT find the state', () => {
    const state = service.get('INEXISTENT_TEST_STATE_NAME');
    expect(state).toBeNull();
  });
});
