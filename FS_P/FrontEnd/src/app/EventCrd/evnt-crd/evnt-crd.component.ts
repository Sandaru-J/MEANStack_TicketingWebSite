import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/Admin/event/event.service';
import { Event } from 'src/app/Admin/event/event.models';

@Component({
  selector: 'app-evnt-crd',
  templateUrl: './evnt-crd.component.html',
  styleUrls: ['./evnt-crd.component.scss']
})
export class EvntCrdComponent implements OnInit {

  events: Event[] = [];
  constructor( public evService:EventService) { }


  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.evService.getView(false).subscribe((response: any) => {
      this.events=response.event;
      console.log(response);
    });
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
