import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Event} from '..//Admin/event/event.models';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class EvListService{

  private events: Event[] = [];
  private eventUpdated = new Subject<Event[]>();

  constructor(private http:HttpClient,private router:Router){}

  // getEvents() {
  //   this.http
  //   .get<{message:string,event: any}>(
  //     'http://localhost:3000/api/event'
  //     ).pipe(
  //       map((eventData)=>{
  //         return eventData.event.map((event:any) =>{
  //           return{
  //             title:event.title,
  //             date:event.date,
  //             organization:event.organization,
  //             id:event._id,
  //             capacity:event.capacity,
  //             location:event.location,
  //             category:event.category,
  //             TicketC1:event.TicketC1,
  //             TicketP1:event.TicketP1,
  //             TicketQ1:event.TicketQ1,
  //             description:event.description,
  //             imagePath:event.imagePath
  //           }
  //         })
  //       }))
  //   .subscribe((trasformedData)=>{
  //     this.events=trasformedData;
  //     this.eventUpdated.next([...this.events]);
  //     console.log(trasformedData);
  //   });
  // }
  // getEvent(id:string){
  //   return  this.http
  //    .get<{message:string,event: any}>(
  //      'http://localhost:3000/api/event/'+id
  //      ).pipe(
  //        map((eventData)=>{

  //            return{
  //              title:eventData.event.title,
  //              date:eventData.event.date,
  //              organization:eventData.event.organization,
  //              id:eventData.event._id,
  //              capacity:eventData.event.capacity,
  //              location:eventData.event.location,
  //              category:eventData.event.category,
  //              TicketC1:eventData.event.TicketC1,
  //              TicketP1:eventData.event.TicketP1,
  //              TicketQ1:eventData.event.TicketQ1,
  //              description:eventData.event.description,
  //              imagePath:eventData.event.imagePath
  //            }

  //        }))

  //  }
  // getEventUpdateListener() {
  //   return this.eventUpdated.asObservable();
  // }
  ViewEvents(){
     return this.http.get("http://localhost:3000/api/event")
  }

}
