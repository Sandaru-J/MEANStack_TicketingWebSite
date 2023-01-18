import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EvListService } from '../../evList.service';
import { Event } from '../../evList.models';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit,OnDestroy{

  events: Event[] = [];
  private eventSub: Subscription = new Subscription;

  constructor(public evListService:EvListService,private socket:SocketService) { }

  ngOnInit(): void {
  //  this.evListService.getEvents();
  //  this.eventSub=this.evListService.getEventUpdateListener()
  //  .subscribe((events: Event[]) => {
  //   this.events = events;
  // });

  this.getEvents()

  this.socket.listenToServer('eventAdded').subscribe((data)=>{
    console.log(data);
    this.events = [data, ...this.events]

  });

  this.socket.listenToServer('eventDeleted').subscribe((data)=>{
    console.log(data);
    this.events = this.events.filter((event)=>{
      return event._id !== data._id;
    })
  })

  this.socket.listenToServer('eventUpdated').subscribe((data)=>{
    console.log(data);
    this.events = this.events.map((event)=>{
      if(event._id === data._id){
        return data;
      }
      else{
        return event;
      }
    })
  })

  }

  onClickEvent(id:any){
    console.log("clicked"+id);
  }
  ngOnDestroy(){
    this.eventSub.unsubscribe();
  }

  getEvents(){
    this.evListService.ViewEvents().subscribe((res:any)=>{
      console.log(res);
      this.events=res.event;
      this.events = this.events.map((event:any) => {

        return {
                ...event,
              //date: new Date(event.date).format('dd-mm-yyyy')
            }

    })})
  }

}
