import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageModule } from './pages/home-page/home-page.module';
import { SkillsetPageModule } from 'src/app/pages/skillset-page/skillset-page.module';
import { WorkExperiencePageModule } from 'src/app/pages/work-experience-page/work-experience-page.module';
import { AboutMePageModule } from 'src/app/pages/about-me-page/about-me-page.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }, {
    path: 'home',
    loadChildren: () => import('src/app/pages/home-page/home-page.module').then(m => HomePageModule),
    data: { animation: 'HomePage' }
  }, {
    path: 'about-me',
    loadChildren: () => import('src/app/pages/about-me-page/about-me-page.module').then(m => AboutMePageModule),
    data: { animation: 'AboutMePage' }
  }, {
    path: 'skillset',
    loadChildren: () => import('src/app/pages/skillset-page/skillset-page.module').then(m => SkillsetPageModule),
    data: { animation: 'SkillsetPage' }
  }, {
    path: 'work-experience',
    loadChildren: () => import('src/app/pages/work-experience-page/work-experience-page.module').then(m => WorkExperiencePageModule),
    data: { animation: 'WorkExperiencePage' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
