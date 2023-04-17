import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsetPageComponent } from './skillset-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: SkillsetPageComponent, children: [
    { path: 'software-development', loadChildren: () => import('src/app/pages/development-skills-page/development-skills-page.module').then(m => m.DevelopmentSkillsPageModule) },
    { path: 'graphic-design', loadChildren: () => import('src/app/pages/design-skills-page/design-skills-page.module').then(m => m.DesignSkillsPageModule) }
  ] }
];

@NgModule({
  declarations: [
    SkillsetPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class SkillsetPageModule { }
