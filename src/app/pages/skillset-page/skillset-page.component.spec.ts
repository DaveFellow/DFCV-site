import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsetPageComponent } from './skillset-page.component';

describe('SkillsetPageComponent', () => {
  let component: SkillsetPageComponent;
  let fixture: ComponentFixture<SkillsetPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsetPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
