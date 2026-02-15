import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent } from './app-layout.component';
import { HeaderComponent } from '../../components/header/header.component';



@NgModule({
  declarations: [
    AppLayoutComponent
  ],
  imports: [
    CommonModule,
    HeaderComponent,
  ],
  exports: [
    AppLayoutComponent
  ]
})
export class AppLayoutModule { }
