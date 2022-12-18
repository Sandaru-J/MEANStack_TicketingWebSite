import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvntCrdComponent } from './EventCrd/evnt-crd/evnt-crd.component';
import { FooterComponent } from './footer/footer/footer.component';

const routes: Routes = [
  // {path:'',component:FooterComponent},
  {path:'event',component:EvntCrdComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
