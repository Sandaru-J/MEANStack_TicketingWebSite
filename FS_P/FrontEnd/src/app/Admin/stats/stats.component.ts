import { Component, OnInit,ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { orderBookingService } from '../bookings/orderBookings.service';
import { EventService } from '../event/event.service';
import { forkJoin, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  bookings: any;
    events: { message: string; booking: {}; }[];
    customers: any;
    cL: any;
  

  constructor(private orderBookingService:orderBookingService,private eventService:EventService) { }
  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart: any;

  ngOnInit(): void {
    this.ngAfterViewInit();
  }
  public bkL:number;
  public EkL:number;


//   getCustoermers(){
//     .get<{message:string,customers:any}>
//     ('http://localhost:3000/api/customers')
//     .subscribe((customerData: { customers: any; })=>{
//         this.customers=customerData.customers;
//         this.cL=this.customers.length;
//         console.log(this.cL);
//         });
//   }
  ngAfterViewInit() {

    
    // forkJoin
    // (
    //     this.orderBookingService.viewBookings().pipe(map(val => [val])),
    //     this.eventService.getEvents().pipe(map(val => [val])),
    //     ).subscribe(([bookings,events]) => {
    //         this.bookings=bookings; 
    //         this.events=events;          
    //         this.bkL=this.bookings.length;
    //         this.EkL=this.events.length;
    //         console.log(this.bkL + " " + this.EkL);
    //     })
        

    forkJoin
    (
        this.orderBookingService.viewBookings(),
        this.eventService.getEvents(),
        ).subscribe(([bookings,events]) => {
            this.bookings=bookings.booking; 
            this.events=events;          
            this.bkL=this.bookings.length;
            this.EkL=this.events.length;
            console.log(this.bkL + " " + this.EkL);


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
          data: [this.bkL, this.EkL, 10,14,6],
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
         })

}


}
