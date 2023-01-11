import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute,ParamMap  } from '@angular/router';
import { evBookingService } from '..//booking/evBooking.service';
import { Event } from 'src/app/Admin/event/event.models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BkData } from './bookingdata.model';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  //BkData:BkData[]=[];
  total=0;
  private eventId: string;
  event:Event = null

  showFormField = false;
  formFieldValue:any []=[];

  BookingForm!: FormGroup;
  imagePreview: string;

  ticketPrices=[
    {value: 2000, viewValue: 2000},
    {value: 4000, viewValue: 4000},
  ]
  bkData: any;
  @Input()

  toggleFormFields() {
    this.showFormField = !this.showFormField;
    if (this.showFormField) {
      this.formFieldValue.push('');
    }
  }
  removeFormFields(i: number) {
    this.formFieldValue.splice(i, 1);
  }
  constructor(public evBookingService:evBookingService,public route:ActivatedRoute) { }

  ngOnInit(): void {

    this.BookingForm=new FormGroup({
      name:new FormControl(null,{validators:[Validators.required]}),
      'email':new FormControl(null,{validators:[Validators.required]}),
      'address':new FormControl(null,{validators:[Validators.required]}),
      'noOfTicket': new FormControl(null,{validators:[Validators.required]}),
      'telephone':new FormControl(null,{validators:[Validators.required]}),

    });

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

  cal(){
    this.total=this.BookingForm.value.noOfTicket*1500;
  }

  onClickProceed(){
    if(this.BookingForm.invalid){
      return
    }else{
      const bkData:BkData = Object.assign(
        {},
        this.BookingForm.value,{
        total:this.total}
      );

      console.log(bkData);

    }

  }

}
