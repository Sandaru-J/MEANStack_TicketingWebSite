import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Event} from '..//Admin/event/event.models';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class evBookingService{
  private events:Event[]=[];

  constructor(private http:HttpClient,private router:Router){}

  viewEvent(id:string){
    return this.http.get
    <{message:string,event: any}>('http://localhost:3000/api/event/'+id)
  }
  getEvent(id:string){
    return  this.http
     .get<{message:string,event: any}>(
       'http://localhost:3000/api/event/'+id
       ).pipe(
         map((eventData)=>{

             return{
               title:eventData.event.title,
               date:eventData.event.date,
               organization:eventData.event.organization,
               id:eventData.event._id,
               capacity:eventData.event.capacity,
               location:eventData.event.location,
               category:eventData.event.category,
               TicketC1:eventData.event.TicketC1,
               TicketP1:eventData.event.TicketP1,
               TicketQ1:eventData.event.TicketQ1,
               description:eventData.event.description,
               imagePath:eventData.event.imagePath
             }

         }))

   }
}
