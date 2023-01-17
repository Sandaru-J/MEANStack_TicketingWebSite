import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventCreateComponent } from './Admin/event/event-create/event-create.component';
import { EventListComponent } from './Admin/event/event-list/event-list.component';
import { AdHeaderComponent } from './Admin/header/header.component';
import { EvntCrdComponent } from './EventCrd/evnt-crd/evnt-crd.component';
import { FooterComponent } from './footer/footer/footer.component';
import { EvDataFormComponent } from './booking/ev-data-form/ev-data-form.component';
import { ListViewComponent } from './EvList/root/list-view/list-view.component';
import { PaypalComponent } from './paypal/paypal.component';
import { CoverBannerComponent } from './coverLanding/cover-banner/cover-banner.component';
import { HomeComponent } from './Admin/home/home.component';
import { LoginComponent } from './Admin/login/login.component';

const routes: Routes = [
  // {path:'',component:FooterComponent},
  //{ path: '', component:AdHeaderComponent},
  //{ path:'', component:ListViewComponent},
  { path: '', component:CoverBannerComponent},
  { path:'event',component:EvntCrdComponent},
  { path: 'event-create',component:EventCreateComponent},
  { path: 'event-list' , component:EventListComponent},
  { path: 'edit/:eventId', component:EventCreateComponent},
  { path: 'booking/:eventId',component:EvDataFormComponent},
  { path: 'paypal', component:PaypalComponent},
  { path: 'admin', component:LoginComponent},
  { path: 'admin/home', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
