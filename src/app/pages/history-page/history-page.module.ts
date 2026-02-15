import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryPageComponent } from './history-page.component';
import { RouterModule, Routes } from '@angular/router';
import { LinkButtonComponent } from 'src/app/shared/components/link-button/link-button.component';
import { TabbedContainerComponent } from 'src/app/shared/components/tabbed-container/tabbed-container.component';

const routes: Routes = [
  { path: '', component: HistoryPageComponent }
];

@NgModule({
  declarations: [
    HistoryPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TabbedContainerComponent,
    LinkButtonComponent
  ]
})
export class HistoryPageModule { }
