import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { event } from './event.models';

@Injectable({providedIn: 'root'})
export class EventService {
  private event: event[] = [];
  private eventUpdated = new Subject<event[]>();

  getPosts() {
    return [...this.event];
  }

  getPostUpdateListener() {
    return this.eventUpdated.asObservable();
  }

  addEvent(title: string, date: string) {
    const event: event = {title: title, date:date,};
    this.event.push(event);
    this.eventUpdated.next([...this.event]);
    console.log('in service')
    console.log(date)
  }
}
