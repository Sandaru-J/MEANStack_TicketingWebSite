import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { map, Subject } from 'rxjs';
import { Event } from './event.models';
import { Router } from "@angular/router";

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
              id:event._id
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
    return{...this.events.find(p=>p.id===id)};
  }

  addEvents(title: string, date: string) {
    const event: Event = { id:null,title: title, date:date,};
    this.http.post<{message:string,eventId:string}>('http://localhost:3000/api/event',event)
    .subscribe(responseData=>{
      console.log(responseData.message)
      const id=responseData.eventId;
      event.id=id;
      this.events.push(event);
      this.eventUpdated.next([...this.events]);
      console.log(event)
    });
  }

  updateEvent(id:string,title:string,date:string){
    const event:Event={id:id,title:title,date:date};
    this.http
    .put('http://localhost:3000/api/event/'+ id,event)
    .subscribe(response=>{
      const updatedEvent=[...this.events];
      const oldEventIndex=updatedEvent.findIndex(p=>p.id === event.id);
      updatedEvent[oldEventIndex]=event;
      this.events=updatedEvent;
      this.eventUpdated.next([...this.events]);
      this.router.navigate(['/event-list'])
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
