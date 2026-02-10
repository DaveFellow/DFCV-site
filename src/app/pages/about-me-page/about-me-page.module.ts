import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutMePageComponent } from './about-me-page.component';
import { RouterModule, Routes } from '@angular/router';
import { TabbedContainerModule } from 'src/app/shared/components/tabbed-container/tabbed-container.module';

const routes: Routes = [
  { path: '', component: AboutMePageComponent, children: [
    { path: 'summary', loadChildren: () => import('src/app/pages/summary-page/summary-page.module').then(m => m.SummaryPageModule) },
    { path: 'history', loadChildren: () => import('src/app/pages/history-page/history-page.module').then(m => m.HistoryPageModule) }
  ] }
];

@NgModule({
  declarations: [
    AboutMePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AboutMePageModule { }
