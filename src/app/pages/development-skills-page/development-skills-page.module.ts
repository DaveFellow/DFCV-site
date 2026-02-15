import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevelopmentSkillsPageComponent } from './development-skills-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ArrowButtonComponent } from 'src/app/shared/components/arrow-button/arrow-button.component';
import { SkillsetGridComponent } from 'src/app/shared/components/skillset-grid/skillset-grid.component';

const routes: Routes = [
  { path: '', component: DevelopmentSkillsPageComponent }
];

@NgModule({
  declarations: [
    DevelopmentSkillsPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SkillsetGridComponent,
    ArrowButtonComponent
  ]
})
export class DevelopmentSkillsPageModule { }
