import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { map, Subject } from 'rxjs';
import { Event } from './event.models';
import { Router } from "@angular/router";
import { transition } from '@angular/animations';

@Injectable({providedIn: 'root'})
export class EventService {
  private events: Event[] = [];
  private eventUpdated = new Subject<Event[]>();


  constructor(private http:HttpClient,private router:Router){}

  getEvents() {
    // return [...this.events];
    this.http
    .get<{message:string,event: any}>(
      'http://localhost:3000/api/event'
      ).pipe(
        map((eventData)=>{
          return eventData.event.map((event:any) =>{
            return{
              title:event.title,
              date:event.date,
              organization:event.organization,
              id:event._id,
              capacity:event.capacity,
              location:event.location,
              category:event.category,
              TicketC1:event.TicketC1,
              TicketP1:event.TicketP1,
              TicketQ1:event.TicketQ1,
              description:event.description
            }
          })
        }))
    .subscribe((trasformedData)=>{
      this.events=trasformedData;
      this.eventUpdated.next([...this.events]);
      console.log(trasformedData);
    });
  }

  getEventUpdateListener() {
    return this.eventUpdated.asObservable();
  }
  getEvent(id:string){
    // console.log(this.events,id)
    // return{...this.events.find(p=>p.id===id)};
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
              description:eventData.event.description
            }

        }))

  }

  addEvents(title: string,
            date: string,
            organization:string,
            location:string,
            capacity:number,
            category:string,
            TicketC1:string,
            TicketP1:number,
            TicketQ1:number,
            description:string) {
    const event: Event = {
      id: null,
      title: title,
      date: date,
      organization:organization,
      location:location,
      capacity:capacity,
      category:category,
      TicketC1:TicketC1,
      TicketP1:TicketP1,
      TicketQ1:TicketQ1,
      description:description
    };
    this.http.post<{message:string,eventId:string}>('http://localhost:3000/api/event',event)
    .subscribe(responseData=>{
      console.log(responseData.message)
      const id=responseData.eventId;
      event.id=id;
      this.events.push(event);
      this.eventUpdated.next([...this.events]);
      //console.log(event)
    });
  }

  updateEvent(
              id:string,
              title:string,
              date:string,
              organization:string,
              location:string,
              capacity:number,
              category:string,
              TicketC1:string,
              TicketP1:number,
              TicketQ1:number,
              description:string){
    const event:Event={
      id: id, title: title, date: date,
      organization: organization,location:location,
      capacity:capacity,category:category,
      TicketC1:TicketC1,TicketP1:TicketP1,
      TicketQ1:TicketQ1,description:description
    };
    this.http
    .put('http://localhost:3000/api/event/'+ id,event)
    .subscribe(response=>{
      const updatedEvent=[...this.events];
      const oldEventIndex=updatedEvent.findIndex(p=>p.id === event.id);
      updatedEvent[oldEventIndex]=event;
      this.events=updatedEvent;
      this.eventUpdated.next([...this.events]);
      this.router.navigate(['/'])
    })
  }

  deleteEvent(eventId:string){
    this.http.delete('http://localhost:3000/api/event/'+ eventId)
    .subscribe(()=>{
      const updatedEvent=this.events.filter(event=>event.id !== eventId);
      this.events=updatedEvent;
      this.eventUpdated.next([...this.events]);
    })
  }
}
