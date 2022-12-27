import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Event } from './event.models';

@Injectable({providedIn: 'root'})
export class EventService {
  private events: Event[] = [];
  private eventUpdated = new Subject<Event[]>();

  constructor(private http:HttpClient){}

  getEvents() {
    //return [...this.event];
    this.http
    .get<{message:string,events: Event[]}>(
      'http://localhost:3000/api/event'
      )
    .subscribe((eventData)=>{
      this.events=eventData.events;
      this.eventUpdated.next([...this.events]);
    });
  }

  getEventUpdateListener() {
    return this.eventUpdated.asObservable();
  }

  addEvents(title: string, date: string) {
    const event: Event = { id:null,title: title, date:date,};
    this.events.push(event);
    this.eventUpdated.next([...this.events]);

  }
}
