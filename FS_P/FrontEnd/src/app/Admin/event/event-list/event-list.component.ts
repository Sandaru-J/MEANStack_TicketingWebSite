import { Component, OnInit,OnDestroy } from '@angular/core';
import { event } from '../event.models';
import { EventService } from '../event.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {
event: event[]=[];
  private eventSub: Subscription = new Subscription;

  constructor( public eventService: EventService) { }

  ngOnInit(): void {
    this.event = this.eventService.getPosts();
    this.eventSub = this.eventService.getPostUpdateListener()
      .subscribe((events: event[]) => {
        this.event = events;
      });

  }
  ngOnDestroy(){
    this.eventSub.unsubscribe();
  }

}
