import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkExperiencePageComponent } from './work-experience-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: WorkExperiencePageComponent }
];

@NgModule({
  declarations: [
    WorkExperiencePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class WorkExperiencePageModule { }
