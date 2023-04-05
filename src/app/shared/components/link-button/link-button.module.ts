import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkButtonComponent } from './link-button.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LinkButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LinkButtonComponent
  ]
})
export class LinkButtonModule { }
