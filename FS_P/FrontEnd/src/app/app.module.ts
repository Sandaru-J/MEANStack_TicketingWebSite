import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule} from '@angular/material/form-field'
import { FormsModule } from  '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { NgxPayPalModule } from 'ngx-paypal';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './cl_header/header/header.component';
import { EvntCrdComponent } from './EventCrd/evnt-crd/evnt-crd.component';
import { CoverBannerComponent } from './coverLanding/cover-banner/cover-banner.component';
import { FooterComponent } from './footer/footer/footer.component';
import { EventCreateComponent } from './Admin/event/event-create/event-create.component';
import { AdHeaderComponent } from './Admin/header/header.component';
import { EventListComponent } from './Admin/event/event-list/event-list.component';
import { MatInputModule } from '@angular/material/input';

import { TemplateComponent } from './EvList/shared/template/template.component';
import { ListViewComponent } from './EvList/root/list-view/list-view.component';
import { EvListService } from './EvList/evList.service';
import { BookingComponent } from './booking/booking.component';
import { EvDataFormComponent } from './booking/ev-data-form/ev-data-form.component';
import { PaypalComponent } from './paypal/paypal.component';
import { LoginComponent } from './Admin/login/login.component';
import { BookingsComponent } from './Admin/bookings/bookings.component';
import { SucessComponent } from './reponses/sucess/sucess.component';
import { HomeComponent } from './Admin/home/home.component';
import { StatsComponent } from './Admin/stats/stats.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EvntCrdComponent,
    CoverBannerComponent,
    FooterComponent,
    EventCreateComponent,
    AdHeaderComponent,
    EventListComponent,
    TemplateComponent,
    ListViewComponent,
    BookingComponent,
    EvDataFormComponent,
    PaypalComponent,
    LoginComponent,
    BookingsComponent,
    SucessComponent,
    HomeComponent,
    StatsComponent,
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
    HttpClientModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatStepperModule,
    NgxPayPalModule,
    MatIconModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
