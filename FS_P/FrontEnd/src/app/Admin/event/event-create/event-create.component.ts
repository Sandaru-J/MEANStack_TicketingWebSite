import { Component, Input, OnInit } from '@angular/core';
import { event } from '../event.models';
import { NgForm } from "@angular/forms";
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent implements OnInit {

  @Input() event:event[]=[];
  constructor(public eventService:EventService) { }

  AddEvent(form: NgForm){
    if(form.invalid){
      return
    }
    const Event:event={
      title:form.value.title,
      date:form.value.date,
    }
    this.eventService.addEvent(form.value.title, form.value.date);
    console.log()
    form.resetForm();
  }

  ngOnInit(): void {
  }

}
