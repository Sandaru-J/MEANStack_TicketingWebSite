import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../event.models';
import { NgForm } from "@angular/forms";
import { EventService } from '../event.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent implements OnInit {

  private mode='create';
  private eventId: any;
  event:Event | any;

  //@Input() event:Event[]=[];
  constructor(public eventService:EventService, public route:ActivatedRoute) { }

  ngOnInit(): void{
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('eventId')){
        this.mode='edit';
        this.eventId=paramMap.get('eventId');
        this.event=this.eventService.getEvent(this.eventId);
      }else{
        this.mode='create';
        this.eventId=null;
      }
    });
  }

  AddEvent(form: NgForm){
    if(form.invalid){
      return
    }
    if(this.mode ==='create'){
    // const Event:event={
    //   title:form.value.title,
    //   date:form.value.date,
    //}
    // const event:Event ={
    //   ...form.value,
    //   id:null
    // }
    this.eventService.addEvents(form.value.title, form.value.date);
    }else{
      this.eventService.updateEvent(this.eventId,
        form.value.title,
        form.value.date);
    }
    form.resetForm();
  }




}
