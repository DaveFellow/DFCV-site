import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BGComponent } from './bg.component';
import { StatesFactoryService } from '../../FSM/Factory/states-factory.service';
import * as THREE from 'three';

describe('BGComponent', () => {
  let component: BGComponent;
  let fixture: ComponentFixture<BGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BGComponent ],
      providers: [
        StatesFactoryService,
        {provide: 'scene', useValue: new THREE.Scene}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
