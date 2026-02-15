import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignSkillsPageComponent } from './design-skills-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ArrowButtonComponent } from 'src/app/shared/components/arrow-button/arrow-button.component';
import { SkillsetGridComponent } from 'src/app/shared/components/skillset-grid/skillset-grid.component';

const routes: Routes = [
  { path: '', component: DesignSkillsPageComponent }
];

@NgModule({
  declarations: [
    DesignSkillsPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SkillsetGridComponent,
    ArrowButtonComponent
  ]
})
export class DesignSkillsPageModule { }
