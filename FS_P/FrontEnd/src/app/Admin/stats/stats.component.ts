import { Component, OnInit,ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { orderBookingService } from '../bookings/orderBookings.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  bookings: any;
  

  constructor(private orderBookingService:orderBookingService) { }
  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart: any;
  ngOnInit(): void {
    this.ngAfterViewInit();
    
      console.log("this is bookings");
  }
  public bkL:number;
  ngAfterViewInit() {
    
    this.orderBookingService.viewBookings().subscribe((bookings)=>{
        this.bookings=bookings.booking;
       
        this.bkL=this.bookings.length;
     
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    const data = {
        labels: [
          'Bookings',
          'Events',
          'Customers',
          'Mails',
          'organizers'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [this.bkL, 18, 10,14,6],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(75, 192, 192)',
            'rgb(255, 205, 86)',
            'rgb(201, 203, 207)',
            'rgb(54, 162, 235)'
          ]
        }]
      };
    new Chart(this.ctx, {
        type: 'polarArea',

        data: data,
    });
});
}

}
