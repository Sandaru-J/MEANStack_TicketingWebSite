import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './cl_header/header/header.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EvntCrdComponent } from './EventCrd/evnt-crd/evnt-crd.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EvntCrdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
