import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../event.models';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { EventService } from '../event.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Injectable } from '@angular/core';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent implements OnInit {

  eventCats = [
    {value: 'Music Concert', viewValue: 'Music Concert'},
    {value: 'Exhibition', viewValue: 'Exhibition'},
    {value: 'Drama', viewValue: 'Drama'},
    {value: 'Festival', viewValue: 'Festival'}
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
      'description':new FormControl('',{validators:[Validators.required]}),
      'image':new FormControl(null,{
          validators:[Validators.required],
          asyncValidators:[mimeType]})
    });
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('eventId')){
        this.mode='edit';
        this.eventId=paramMap.get('eventId');

        this.eventService.getEvent(this.eventId).subscribe((event)=>{

          //this.event = event;
          // this.eventForm.setValue({
          //   title:this.event.title,
          //   date:this.event.date,
          //   organization:this.event.organization,
          //   location:this.event.location,
          //   capacity:this.event.capacity,
          //   category:this.event.category,
          //   TicketC1:this.event.TicketC1,
          //   TicketP1:this.event.TicketP1,
          //   TicketQ1:this.event.TicketQ1,
          //   description:this.event.description,
          //   imagePath:this.event.imagePath
          // })
          this.event={
            id:event.id,
            title:event.title,
            date:event.date,
            organization:event.organization,
            location:event.location,
            capacity:event.capacity,
            category:event.category,
            TicketC1:event.TicketC1,
            TicketP1:event.TicketP1,
            TicketQ1:event.TicketQ1,
            description:event.description,
            imagePath:null
          }
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
            description:this.event.description,
            image:this.event.imagePath
          })

        });
      }else{
        this.mode='create';
        this.eventId=null;
      }
    });
  }

  AddEvent(){
    if(this.eventForm.invalid){
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
                                this.eventForm.value.description,
                                this.eventForm.value.image
                                );

    }else{
      this.eventService.updateEvent(this.eventId,
        this.eventForm.value.title,
        this.eventForm.value.date,
        this.eventForm.value.organization,
        this.eventForm.value.location,
        this.eventForm.value.capacity,
        this.eventForm.value.category,
        this.eventForm.value.TicketC1,
        this.eventForm.value.TicketP1,
        this.eventForm.value.TicketQ1,
        this.eventForm.value.description,
        this.eventForm.value.image

      );
    }
    this.eventForm.reset();

  }

  onImagePicked(event:any){
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files[0];
    this.eventForm.patchValue({image:file});
    this.eventForm.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

  }
  }

