import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BGComponent } from './shared/components/bg/bg.component';
import { AppLayoutModule } from './shared/layouts/app-layout/app-layout.module';
import { ArrowButtonModule } from './shared/components/arrow-button/arrow-button.module';

@NgModule({
  declarations: [
    AppComponent,
    BGComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppLayoutModule,
    ArrowButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
