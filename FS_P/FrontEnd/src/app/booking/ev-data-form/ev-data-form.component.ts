import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,ParamMap  } from '@angular/router';
import { EventService } from 'src/app/Admin/event/event.service';
import { evBookingService } from '../evBooking.service';
import { Event } from 'src/app/Admin/event/event.models';
@Component({
  selector: 'app-ev-data-form',
  templateUrl: './ev-data-form.component.html',
  styleUrls: ['./ev-data-form.component.scss']
})
export class EvDataFormComponent implements OnInit {

  private eventId: string;
  event:Event = null
  constructor(public evBookingService:evBookingService,public route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('eventId')){
        this.eventId=paramMap.get('eventId');
        console.log(this.eventId);
        this.evBookingService.viewEvent(this.eventId).subscribe((res:any)=>{
          this.event=res.event;
          console.log(this.event);
        });
      }
    });

  }



}
