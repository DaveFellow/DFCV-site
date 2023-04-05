import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryPageComponent } from './summary-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: SummaryPageComponent }
];

@NgModule({
  declarations: [
    SummaryPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class SummaryPageModule { }
