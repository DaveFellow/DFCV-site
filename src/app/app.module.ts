import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BGComponent } from './shared/components/bg/bg.component';
import { AppLayoutModule } from './shared/layouts/app-layout/app-layout.module';

@NgModule({
  declarations: [
    AppComponent,
    BGComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
