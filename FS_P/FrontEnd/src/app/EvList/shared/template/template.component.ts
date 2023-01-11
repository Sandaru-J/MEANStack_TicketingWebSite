import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EvListService } from '../../evList.service';
import { Event } from '../../evList.models';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit,OnDestroy{

  events: Event[] = [];
  private eventSub: Subscription = new Subscription;

  constructor(public evListService:EvListService) { }

  ngOnInit(): void {
  //  this.evListService.getEvents();
  //  this.eventSub=this.evListService.getEventUpdateListener()
  //  .subscribe((events: Event[]) => {
  //   this.events = events;
  // });

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

  onClickEvent(id:any){
    console.log("clicked"+id);
  }
  ngOnDestroy(){
    this.eventSub.unsubscribe();
  }

}
