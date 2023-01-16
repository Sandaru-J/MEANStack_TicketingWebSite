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
  // getEvent(id:string){
  //   return  this.http
  //    .get<{message:string,event: any}>(
  //      'http://localhost:3000/api/event/'+id
  //      ).pipe(
  //        map((eventData)=>{

  //            return{
  //              title:eventData.event.title,
  //              date:eventData.event.date,
  //              organization:eventData.event.organization,
  //              id:eventData.event._id,
  //              capacity:eventData.event.capacity,
  //              location:eventData.event.location,
  //              category:eventData.event.category,
  //              TicketC1:eventData.event.TicketC1,
  //              TicketP1:eventData.event.TicketP1,
  //              TicketQ1:eventData.event.TicketQ1,
  //              description:eventData.event.description,
  //              imagePath:eventData.event.imagePath
  //            }

  //        }))

  //  }

  //  addBooking(name:string, email:string,nic:string,
  //   address:string,telephone:string,noOfTickets:number,
  //   total:number,eventID:string,eventName:string,){
  //   const bookingData: BkData={
  //     name: name, email: email, nic: nic,
  //     address: address, telephone: telephone,
  //     total: total, eventID, eventName,
  //     noOfTickets:noOfTickets
  //   }
  //   this.http.post<{message:string}>("http://localhost:3000/api/booking",bookingData)
  //   .subscribe((responseData)=>{
  //     console.log(responseData.message);
  //     //this.router.navigate(["/"]);
  //     //console.log(bookingData);
  //   })
  //   this.BookingTotal=bookingData.total;
  //  }
   addBooking(){

    this.http.post<{message:string}>("http://localhost:3000/api/booking",this.bookingData)
    .subscribe((responseData)=>{
      console.log(responseData.message);
      //this.router.navigate(["/"]);
      //console.log(bookingData);
    })
    this.BookingTotal=this.bookingData.total;
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
    return this.BookingTotal;
  }

setFormData(data:BkData,eventId:string,total:Number,eventName:string){
  this.bookingData=data;
  this.bookingData.total=total;
  this.bookingData.eventID=eventId;
  this.bookingData.eventName=eventName;
}


}
