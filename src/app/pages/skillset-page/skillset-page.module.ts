import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsetPageComponent } from './skillset-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: SkillsetPageComponent }
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
