import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillCardComponent } from './skill-card.component';



@NgModule({
  declarations: [
    SkillCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkillCardComponent
  ]
})
export class SkillCardModule { }
