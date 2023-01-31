import { Component, OnInit,OnDestroy } from '@angular/core';
import { Event } from '../event.models';
import { EventService } from '../event.service';
import { Subscription } from 'rxjs';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {
events: Event[]=[];
  private eventSub: Subscription = new Subscription;

  constructor( public eventService: EventService,private socket:SocketService) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe((events: Event[]) => {
        this.events = events;
        });
    this.eventSub = this.eventService.getEventUpdateListener()
      .subscribe((events: Event[]) => {
        this.events = events;
      });
      this.socket.listenToServer('eventAdded').subscribe((data)=>{
        console.log(data);
        this.events = [data, ...this.events]

      });
      this.socket.listenToServer('eventDeleted').subscribe((data)=>{
        console.log(data);
        this.events = this.events.filter((event)=>{
          return event.id !== data._id;
        })

      });

      this.socket.listenToServer('eventUpdated').subscribe((data)=>{
        console.log(data);
        this.events = this.events.map((event)=>{
          if(event.id === data._id){
            return data;
          }
          else{
            return event;
          }
        })

      });
  }
  onDelete(eventID:any){
    this.eventService.deleteEvent(eventID);
  }
  ngOnDestroy(){
    this.eventSub.unsubscribe();
  }

}
