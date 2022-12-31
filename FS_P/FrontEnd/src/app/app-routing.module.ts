import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventCreateComponent } from './Admin/event/event-create/event-create.component';
import { EventListComponent } from './Admin/event/event-list/event-list.component';
import { AdHeaderComponent } from './Admin/header/header.component';
import { EvntCrdComponent } from './EventCrd/evnt-crd/evnt-crd.component';
import { FooterComponent } from './footer/footer/footer.component';

const routes: Routes = [
  // {path:'',component:FooterComponent},
  //{ path: '', component:AdHeaderComponent},
  { path:'event',component:EvntCrdComponent},
  { path: 'event-create',component:EventCreateComponent},
  { path: 'event-list' , component:EventListComponent},
  { path: 'edit/:eventId', component:EventCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
