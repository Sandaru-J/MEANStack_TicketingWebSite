import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../event.models';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { EventService } from '../event.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent implements OnInit {

  eventCats = [
    {value: 'Music Concert-0', viewValue: 'Music Concert'},
    {value: 'Exhibition-1', viewValue: 'Exhibition'},
    {value: 'Drama-2', viewValue: 'Drama'},
    {value: 'Festival-3', viewValue: 'Festival'}
  ];

  private mode='create';
  private eventId: any;
  event:Event | any;
  eventForm!: FormGroup;
  imagePreview: string;
  //@Input() event:Event[]=[];
  constructor(public eventService:EventService, public route:ActivatedRoute) { }

  ngOnInit(): void{
    this.eventForm= new FormGroup({

      'title':new FormControl('',{validators:[Validators.required,Validators.minLength(3)]}),
      'date': new FormControl('',{validators:[Validators.required]}),
      'organization': new FormControl('',{validators:[Validators.required]}),
      'location':new FormControl('',{validators:[Validators.required]}),
      'capacity': new FormControl('',{validators:[Validators.required]}),
      'category': new FormControl(''),
      'TicketC1':new FormControl('',{validators:[Validators.required]}),
      'TicketP1':new FormControl('',{validators:[Validators.required]}),
      'TicketQ1':new FormControl('',{validators:[Validators.required]}),
    });
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('eventId')){
        this.mode='edit';
        this.eventId=paramMap.get('eventId');
        console.log(this.eventId)
        this.event=this.eventService.getEvent(this.eventId).subscribe((event)=>{
          console.log(this.event)
          this.event = event;
          this.eventForm.setValue({
            title:this.event.title,
            date:this.event.date,
            organization:this.event.organization,
            location:this.event.location,
            capacity:this.event.capacity,
            category:this.event.category,
            TicketC1:this.event.TicketC1,
            TicketP1:this.event.TicketP1,
            TicketQ1:this.event.TicketQ1,
          })

        });
      }else{
        this.mode='create';
        this.eventId=null;
      }
    });
  }

  AddEvent(){
    // if(this.eventForm.invalid){
    //   return
    // }
    if(this.mode ==='create'){
    // const Event:event={
    //   title:form.value.title,
    //   date:form.value.date,
    //}
    // const event:Event ={
    //   ...form.value,
    //   id:null
    // }
    //console.log(this.eventForm.value);
    this.eventService.addEvents(this.eventForm.value.title,
                                this.eventForm.value.date,
                                this.eventForm.value.organization,
                                this.eventForm.value.location,
                                this.eventForm.value.capacity,
                                this.eventForm.value.category,
                                this.eventForm.value.TicketC1,
                                this.eventForm.value.TicketP1,
                                this.eventForm.value.TicketQ1,
                                );

    // }else{
    //   this.eventService.updateEvent(this.eventId,
    //     this.eventForm.value.title,
    //     this.eventForm.value.date,
    //   );
    // }
      console.log('came')
    this.eventForm.reset();
  }

  // onImagePicked(event:any){
  //   const fileInput = event.target as HTMLInputElement;
  // const file = fileInput.files[0];
  //   this.eventForm.get("image").updateValueAndValidity();
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imagePreview = reader.result as string;
  //   };
  //   reader.readAsDataURL(file);
  // }
  }
}
