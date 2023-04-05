import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkExperiencePageComponent } from './work-experience-page.component';

describe('WorkExperiencePageComponent', () => {
  let component: WorkExperiencePageComponent;
  let fixture: ComponentFixture<WorkExperiencePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkExperiencePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkExperiencePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
