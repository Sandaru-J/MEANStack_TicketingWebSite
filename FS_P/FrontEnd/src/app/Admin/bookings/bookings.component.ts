import { Component, OnInit } from '@angular/core';
import { orderBookingService } from './orderBookings.service';
import { BkData } from 'src/app/booking/bookingdata.model';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  bookings:BkData[]=[];

  constructor(private orderBookingService:orderBookingService) { }

  ngOnInit(): void {

    this.orderBookingService.viewBookings().subscribe((data)=>{
      this.bookings=data.booking;
      console.log(this.bookings);
    });
  }

  onDelete(id:string){
    this.orderBookingService.deleteBooking(id).subscribe((data)=>{
      console.log(data);
    });
  }
}
