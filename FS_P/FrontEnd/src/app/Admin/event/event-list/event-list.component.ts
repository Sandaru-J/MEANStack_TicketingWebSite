import { Component, OnInit,OnDestroy } from '@angular/core';
import { Event } from '../event.models';
import { EventService } from '../event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {
events: Event[]=[];
  private eventSub: Subscription = new Subscription;

  constructor( public eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEvents();
    this.eventSub = this.eventService.getEventUpdateListener()
      .subscribe((events: Event[]) => {
        this.events = events;
      });
  }
  onDelete(eventID:any){
    this.eventService.deleteEvent(eventID);
  }
  ngOnDestroy(){
    this.eventSub.unsubscribe();
  }

}
