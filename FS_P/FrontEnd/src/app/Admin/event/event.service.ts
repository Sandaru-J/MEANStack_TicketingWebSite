import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { Subject } from 'rxjs';
import { Event } from './event.models';

@Injectable({providedIn: 'root'})
export class EventService {
  private events: Event[] = [];
  private eventUpdated = new Subject<Event[]>();

  constructor(private http:HttpClient){}

  getEvents() {
    // return [...this.events];
    this.http
    .get<{message:string,event: Event[]}>(
      'http://localhost:3000/api/event'
      )
    .subscribe((eventData)=>{
      this.events=eventData.event;
      this.eventUpdated.next(this.events);
      console.log(eventData);
    });
  }

  getEventUpdateListener() {
    return this.eventUpdated.asObservable();
  }

  addEvents(title: string, date: string) {
    const event: Event = { id:null,title: title, date:date,};
    this.http.post<{message:string}>('http://localhost:3000/api/event',event)
    .subscribe((responseData)=>{
      console.log(responseData.message)
      this.events.push(event);
      this.eventUpdated.next(this.events);
    });
  }
}
