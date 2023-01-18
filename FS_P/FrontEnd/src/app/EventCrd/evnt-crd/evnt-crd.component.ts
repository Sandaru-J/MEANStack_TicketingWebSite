import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/Admin/event/event.service';
import { Event } from 'src/app/Admin/event/event.models';
import { DatePipe } from '@angular/common';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-evnt-crd',
  templateUrl: './evnt-crd.component.html',
  styleUrls: ['./evnt-crd.component.scss']
})
export class EvntCrdComponent implements OnInit {

  events: Event[] = [];
  constructor( public evService:EventService,private socket:SocketService) { }


  ngOnInit(): void {
    this.getData();
    this.socket.listenToServer('eventAdded').subscribe((data)=>{
      console.log(data);

      this.events = [data, ...this.events]
      this.events = this.events.splice(0,4);

    });

    this.socket.listenToServer('eventDeleted').subscribe((data)=>{
      console.log(data);
      this.getData()
    })

    this.socket.listenToServer('eventUpdated').subscribe((data)=>{
      console.log(data);
      this.events = this.events.map((event)=>{
        if(event.id === data._id){
          return data;
        }
        else{
          return event;
        }
      })
    })
  }
  getData() {
    this.evService.getView(false).subscribe((response: any) => {
      this.events=response.event;
      console.log(response);
    });
    //chnage date format

  }

  url1:string ="../assets/evntCrd1.jpg";
  imgChange1(event:any){
    this.url1 = event.target.src;
    //console.log(event.target.src);
  }
  url2:string ="../assets/Drama3.jpg";
  imgChange2(event:any){
    this.url2 = event.target.src;
    //console.log(event.target.src);
  }
  url3:string ="../assets/concert1.jpg";
  imgChange3(event:any){
    this.url3 = event.target.src;
    //console.log(event.target.src);
  }
  url4:string ="../assets/art1.jpg";
  imgChange4(event:any){
    this.url4 = event.target.src;
    //console.log(event.target.src);
  }



}
