import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsetGridComponent } from './skillset-grid.component';
import { SkillCardModule } from '../skill-card/skill-card.module';



@NgModule({
  declarations: [
    SkillsetGridComponent
  ],
  imports: [
    CommonModule,
    SkillCardModule
  ],
  exports: [
    SkillsetGridComponent
  ]
})
export class SkillsetGridModule { }
