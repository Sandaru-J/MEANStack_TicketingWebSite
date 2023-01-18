import { Component, OnInit } from '@angular/core';
import { orderBookingService } from './orderBookings.service';
import { BkData } from 'src/app/booking/bookingdata.model';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  bookings:BkData[]=[];

  constructor(private orderBookingService:orderBookingService,private socket:SocketService) { }

  ngOnInit(): void {

    this.orderBookingService.viewBookings().subscribe((data)=>{
      this.bookings=data.booking;
      console.log(this.bookings);
    });

    this.socket.listenToServer('bookingAdded').subscribe((data)=>{
      console.log(data);
      this.bookings = [data, ...this.bookings]

    });

  }

  onDelete(id:string){
    this.orderBookingService.deleteBooking(id).subscribe((data)=>{
      console.log(data);
    });
  }
}
