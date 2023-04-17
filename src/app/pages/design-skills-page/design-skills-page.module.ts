import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignSkillsPageComponent } from './design-skills-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SkillsetGridModule } from 'src/app/shared/components/skillset-grid/skillset-grid.module';

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
    SkillsetGridModule
  ]
})
export class DesignSkillsPageModule { }
