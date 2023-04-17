import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignSkillsPageComponent } from './design-skills-page.component';

describe('DesignSkillsPageComponent', () => {
  let component: DesignSkillsPageComponent;
  let fixture: ComponentFixture<DesignSkillsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignSkillsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignSkillsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
