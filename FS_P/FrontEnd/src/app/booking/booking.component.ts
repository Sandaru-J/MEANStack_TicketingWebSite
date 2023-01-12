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
  eventName:string;
  Ticket1:Number=null;


  showFormField = false;
  formFieldValue:any []=[];

  BookingForm!: FormGroup;
  imagePreview: string;

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
      'nic':new FormControl(null,{validators:[Validators.required]}),
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
          this.eventName=this.event.title;
          this.Ticket1=this.event.TicketP1;
          console.log(this.event.TicketP1);
        });
      }
    });
  }
  ticketPrices=[
    {value: this.Ticket1, viewValue: this.Ticket1},
    {value: 4000, viewValue: 4000},
  ]


  cal(){
    this.total=this.BookingForm.value.noOfTicket*1500;
  }

  // AddBooking(){
  //   this.evBookingService.addBooking(
  //     this.BookingForm.value.name,
  //     this.BookingForm.value.email,
  //     this.BookingForm.value.nic,
  //     this.BookingForm.value.address,
  //     this.BookingForm.value.telephone,
  //     this.BookingForm.value.noOfTicket,
  //     this.total,
  //     this.eventId,
  //     this.eventName

  //     )
  // }

  onClickProceed(){
    if(this.BookingForm.invalid){
      return
    }else{
      // const bkData:BkData = Object.assign(
      //   {},
      //   this.BookingForm.value,{
      //   total:this.total}
      // );

      // console.log(bkData);
      }

    }

      // sendTicket(){

      // }



  }
function sendTicket() {
  throw new Error('Function not implemented.');
}

