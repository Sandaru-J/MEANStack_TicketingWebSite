import { Component, OnInit,OnDestroy } from '@angular/core';
import { Event } from '../event.models';
import { EventService } from '../event.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {
events: Event[]=[];
pageSizeOptions = [1, 2, 5, 10];
totalEvents = 0;
eventsPerPage = 2;
currentPage = 1;
  private eventSub: Subscription = new Subscription;

  constructor( public eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEvents(this.eventsPerPage,this.currentPage);
    this.eventSub = this.eventService.getEventUpdateListener()
      .subscribe((eventData:{ Events:Event[],eventCount:number}) => {
        this.totalEvents = eventData.eventCount;
        this.events = eventData.Events;
      });
  }

  onChangedPage(PageData:PageEvent){
    this.currentPage = PageData.pageIndex + 1;
    this.eventsPerPage = PageData.pageSize;
    this.eventService.getEvents(this.eventsPerPage,this.currentPage);
  }
  // onDelete(eventID:string){
  //   this.eventService.deleteEvent(eventID).subscribe(response=>{ //add the button method (click)="onDelete(event.id)" to the html
  //    this.eventService.getEvents(this.eventsPerPage,this.currentPage);
  //   });
  // }
  ngOnDestroy(){
    this.eventSub.unsubscribe();
  }

}
