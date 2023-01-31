import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Event} from '..//Admin/event/event.models';
import { Router } from "@angular/router";
import { BkData } from './bookingdata.model';
import { response } from 'express';
import { BookingComponent } from './booking.component';

@Injectable({
  providedIn: 'root'
})
export class evBookingService{
  private events:Event[]=[];
  bookingData :BkData | null = null;
  BookingTotal:Number=0;
  constructor(private http:HttpClient,private router:Router){}

  viewEvent(id:string){
    return this.http.get
    <{message:string,event: any}>('http://localhost:3000/api/event/'+id)
  }

   addBooking(){
    if(!this.bookingData){
      this.router.navigate(["/"]);
      return;
    }
    this.http.post<{message:string}>("http://localhost:3000/api/booking",this.bookingData)
    .subscribe((responseData)=>{
      console.log(responseData.message);

      //console.log(bookingData);
    })
    this.BookingTotal=this.bookingData.total;
    this.router.navigate(["/success"]);
   }

   addCustomer(name:string, email:string,nic:string,
    telephone:string){
      const customerData={
        name: name, email: email, nic: nic,
        telephone: telephone
      }
      this.http.post<{message:string}>("http://localhost:3000/api/customer",customerData)
      .subscribe((responseData)=>{
        console.log(responseData.message);
        console.log(customerData);
      })
    }
   getBookingTotal() {
    console.log(this.BookingTotal);
    return this.BookingTotal;
  }

setFormData(data:BkData,eventId:string,total:Number,eventName:string){
  this.bookingData=data;
  this.bookingData.total=total;
  this.bookingData.eventID=eventId;
  this.bookingData.eventName=eventName;
}


}
