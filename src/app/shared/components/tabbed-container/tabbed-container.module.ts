import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabbedContainerComponent } from './tabbed-container.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    TabbedContainerComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    TabbedContainerComponent
  ]
})
export class TabbedContainerModule { }
