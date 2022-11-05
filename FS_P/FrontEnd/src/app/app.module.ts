import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './cl_header/header/header.component';
import { EvntCrdComponent } from './EventCrd/evnt-crd/evnt-crd.component';
import { CoverBannerComponent } from './coverLanding/cover-banner/cover-banner.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EvntCrdComponent,
    CoverBannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
