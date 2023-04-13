import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryPageComponent } from './history-page.component';
import { RouterModule, Routes } from '@angular/router';
import { TabbedContainerModule } from 'src/app/shared/components/tabbed-container/tabbed-container.module';
import { LinkButtonModule } from 'src/app/shared/components/link-button/link-button.module';

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
    TabbedContainerModule,
    LinkButtonModule
  ]
})
export class HistoryPageModule { }
