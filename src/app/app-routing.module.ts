import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageModule } from './pages/home-page/home-page.module';
import { SkillsetPageModule } from 'src/app/pages/skillset-page/skillset-page.module';
import { WorkExperiencePageModule } from 'src/app/pages/work-experience-page/work-experience-page.module';
import { PortfolioPageModule } from 'src/app/pages/portfolio-page/portfolio-page.module';
import { SummaryPageModule } from 'src/app/pages/summary-page/summary-page.module';
import { AboutMePageModule } from 'src/app/pages/about-me-page/about-me-page.module';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('src/app/pages/home-page/home-page.module').then(m => HomePageModule) },
  { path: 'about-me', loadChildren: () => import('src/app/pages/about-me-page/about-me-page.module').then(m => AboutMePageModule) },
  { path: 'skillset', loadChildren: () => import('src/app/pages/skillset-page/skillset-page.module').then(m => SkillsetPageModule) },
  { path: 'work-experience', loadChildren: () => import('src/app/pages/work-experience-page/work-experience-page.module').then(m => WorkExperiencePageModule) },
  { path: 'portfolio', loadChildren: () => import('src/app/pages/portfolio-page/portfolio-page.module').then(m => PortfolioPageModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
