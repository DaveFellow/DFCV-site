import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsetGridComponent } from './skillset-grid.component';

describe('SkillsetGridComponent', () => {
  let component: SkillsetGridComponent;
  let fixture: ComponentFixture<SkillsetGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsetGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsetGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
