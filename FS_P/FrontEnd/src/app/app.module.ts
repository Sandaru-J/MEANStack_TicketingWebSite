import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule} from '@angular/material/form-field'
import { FormsModule } from  '@angular/forms';
import { MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import {  MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './cl_header/header/header.component';
import { EvntCrdComponent } from './EventCrd/evnt-crd/evnt-crd.component';
import { CoverBannerComponent } from './coverLanding/cover-banner/cover-banner.component';
import { FooterComponent } from './footer/footer/footer.component';
import { LoginComponent } from './Admin/Login/login/login.component';
import { EventCreateComponent } from './Admin/event/event-create/event-create.component';
import { AdHeaderComponent } from './Admin/header/header.component';
import { EventListComponent } from './Admin/event/event-list/event-list.component';
import { EvBannerComponent } from './Booking/ev-banner/ev-banner.component';
import { BookingDataComponent } from './Booking/booking-data/booking-data.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EvntCrdComponent,
    CoverBannerComponent,
    FooterComponent,
    LoginComponent,
    EventCreateComponent,
    AdHeaderComponent,
    EventListComponent,
    EvBannerComponent,
    BookingDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatStepperModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
