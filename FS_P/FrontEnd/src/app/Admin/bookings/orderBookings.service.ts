import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BkData } from '../../booking/bookingdata.model';

@Injectable({providedIn: 'root'})
export class orderBookingService {


  constructor(private http:HttpClient,private router:Router){}

  viewBookings(){
    return this.http.get<{message:string,booking: any}>('http://localhost:3000/api/booking/');
  }

  deleteBooking(id:string){
    return this.http.delete<{message:string,booking: any}>('http://localhost:3000/api/booking/'+id);
  }
}
