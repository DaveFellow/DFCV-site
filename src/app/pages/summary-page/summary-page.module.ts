import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryPageComponent } from './summary-page.component';
import { RouterModule, Routes } from '@angular/router';
import { TabbedContainerModule } from 'src/app/shared/components/tabbed-container/tabbed-container.module';

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
    TabbedContainerModule
  ]
})
export class SummaryPageModule { }
