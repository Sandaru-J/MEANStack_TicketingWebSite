import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute,ParamMap, Router, RouterLink  } from '@angular/router';
import { evBookingService } from '..//booking/evBooking.service';
import { Event } from 'src/app/Admin/event/event.models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BkData } from './bookingdata.model';
import { IPayPalConfig } from 'ngx-paypal';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  //BkData:BkData[]=[];
  total=0;
  eventId: string;
  event:Event = null
  eventName:string;
  public Ticket1:any=2000||null;


  showFormField = false;
  formFieldValue:any []=[];

  BookingForm!: FormGroup;
  imagePreview: string;

  bkData: any;
payPalConfig: IPayPalConfig;
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
  constructor(public evBookingService:evBookingService,public route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {

    this.BookingForm=new FormGroup({
      name:new FormControl(null,{validators:[Validators.required]}),
      'email':new FormControl(null,{validators:[Validators.required]}),
      'nic':new FormControl(null,{validators:[Validators.required]}),
      'address':new FormControl(null,{validators:[Validators.required]}),
      'noOfTicket': new FormControl(null,{validators:[Validators.required]}),
      'telephone':new FormControl(null,{validators:[Validators.required]}),
      //'ticketPrice':new FormControl(null,{validators:[Validators.required]}),

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
    //{value: this.Ticket1, viewValue: this.Ticket1},
    {value: 4000, viewValue: 2500},
  ]


  cal(){
    this.total=this.BookingForm.value.noOfTicket*this.Ticket1;
  }


  AddCustomer(){
    this.evBookingService.addCustomer(
      this.BookingForm.value.name,
      this.BookingForm.value.email,
      this.BookingForm.value.nic,
      this.BookingForm.value.telephone,
      )
  }


  onClickProceed(){
    if(this.BookingForm.invalid){
      console.log('doesnt it');
      return
    }else{
      // const bkData:BkData = Object.assign(
      //   {},
      //   this.BookingForm.value,{
      //   total:this.total}
      // );

      // console.log(bkData);



    this.evBookingService.setFormData(this.BookingForm.value,this.eventId,this.total,this.eventName);
      this.router.navigate(['/paypal'])
      console.log('does it');

    }
  }


  sendBkData(){
    return this.BookingForm.value;
  }




  }
function sendTicket() {
  throw new Error('Function not implemented.');
}

