import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopmentSkillsPageComponent } from './development-skills-page.component';

describe('DevelopmentSkillsPageComponent', () => {
  let component: DevelopmentSkillsPageComponent;
  let fixture: ComponentFixture<DevelopmentSkillsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevelopmentSkillsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevelopmentSkillsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
