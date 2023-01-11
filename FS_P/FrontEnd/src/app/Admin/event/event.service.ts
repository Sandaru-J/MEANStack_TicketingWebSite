import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { map, Subject } from 'rxjs';
import { Event } from './event.models';
import { Router } from "@angular/router";
import { transition } from '@angular/animations';

@Injectable({providedIn: 'root'})
export class EventService {
  private events: Event[] = [];
  private eventUpdated = new Subject<Event[]>();


  constructor(private http:HttpClient,private router:Router){}

  getEvents() {
    this.http
    .get<{message:string,event: any}>(
      'http://localhost:3000/api/event'
      ).pipe(
        map((eventData)=>{
          return eventData.event.map((event:any) =>{
            return{
              title:event.title,
              date:event.date,
              organization:event.organization,
              id:event._id,
              capacity:event.capacity,
              location:event.location,
              category:event.category,
              TicketC1:event.TicketC1,
              TicketP1:event.TicketP1,
              TicketQ1:event.TicketQ1,
              description:event.description,
              imagePath:event.imagePath
            }
          })
        }))
    .subscribe((trasformedData)=>{
      this.events=trasformedData;
      this.eventUpdated.next([...this.events]);
      console.log(trasformedData);
    });
  }

  getEventUpdateListener() {
    return this.eventUpdated.asObservable();
  }
  getEvent(id:string){
   return  this.http
    .get<{message:string,event: any}>(
      'http://localhost:3000/api/event/'+id
      ).pipe(
        map((eventData)=>{

            return{
              title:eventData.event.title,
              date:eventData.event.date,
              organization:eventData.event.organization,
              id:eventData.event._id,
              capacity:eventData.event.capacity,
              location:eventData.event.location,
              category:eventData.event.category,
              TicketC1:eventData.event.TicketC1,
              TicketP1:eventData.event.TicketP1,
              TicketQ1:eventData.event.TicketQ1,
              description:eventData.event.description,
              imagePath:eventData.event.imagePath
            }

        }))

  }

  // getEvent(id:string){
  //   return this.http.get<{
  //     _id:string,title:string,date:string,organization:string,
  //     capacity:Number,location:string,category:string,TicketC1:string,
  //     TicketP1:Number,TicketQ1:Number,description:string,imagePath:string
  //   }>("http://localhost:3000/api/event/" + id)
  // }

  addEvents(title: string,
            date: string,
            organization:string,
            location:string,
            capacity:number,
            category:string,
            TicketC1:string,
            TicketP1:number,
            TicketQ1:number,
            description:string,
            image:File
            ) {
    // const event: Event = {
    //   id: null,
    //   title: title,
    //   date: date,
    //   organization:organization,
    //   location:location,
    //   capacity:capacity,
    //   category:category,
    //   TicketC1:TicketC1,
    //   TicketP1:TicketP1,
    //   TicketQ1:TicketQ1,
    //   description:description
    // };
    const eventData= new FormData();
    eventData.append('title',title);
    eventData.append('date',date);
    eventData.append('organization',organization);
    eventData.append('location',location);
    eventData.append('capacity', capacity.toString());
    eventData.append('category',category);
    eventData.append('TicketC1',TicketC1);
    eventData.append('TicketP1',TicketP1.toString());
    eventData.append('TicketQ1',TicketQ1.toString());
    eventData.append('description',description);
    eventData.append('image',image,title)
    this.http.post<{
      event: any;message:string,eventId:string
}>('http://localhost:3000/api/event',eventData)
    .subscribe(responseData=>{
      const event:Event={
        id: responseData.eventId,
        title: title,
        date: date,
        organization: organization,
        location: location,
        capacity: capacity,
        category: category,
        TicketC1: TicketC1,
        TicketP1: TicketP1,
        TicketQ1: TicketQ1,
        description: description,
        imagePath:""
      }
      // const id=responseData.eventId; // used when not using image uncomment above const post to activate
      // event.id=id;
      this.events.push(event);
      this.eventUpdated.next([...this.events]);
      //console.log(event)
    });
  }

  updateEvent(
              id:string,
              title:string,
              date:string,
              organization:string,
              location:string,
              capacity:number,
              category:string,
              TicketC1:string,
              TicketP1:number,
              TicketQ1:number,
              description:string,
              image:File | string){
    // const event:Event={
    //   id: id, title: title, date: date,
    //   organization: organization, location: location,
    //   capacity: capacity, category: category,
    //   TicketC1: TicketC1, TicketP1: TicketP1,
    //   TicketQ1: TicketQ1, description: description,
    //   imagePath: ''
    // };
    let eventData:Event|FormData;
    if(typeof image==='object'){
      eventData = new FormData();
      eventData.append('id',id);
      eventData.append('title',title);
      eventData.append('date',date);
      eventData.append('organization',organization);
      eventData.append('location',location);
      eventData.append('capacity', capacity.toString());
      eventData.append('category',category);
      eventData.append('TicketC1',TicketC1);
      eventData.append('TicketP1',TicketP1.toString());
      eventData.append('TicketQ1',TicketQ1.toString());
      eventData.append('description',description);
      eventData.append('image',image,title)
      console.log('comes first one')
    }else{
      eventData={
        id:id,
        title:title,
        date:date,
        organization:organization,
        location:location,
        capacity:capacity,
        category:category,
        TicketC1:TicketC1,
        TicketP1:TicketP1,
        TicketQ1:TicketQ1,
        description:description,
        imagePath:image,

      }

    }
    this.http
    .put('http://localhost:3000/api/event/'+ id,eventData)
    .subscribe(response=>{
      const updatedEvent=[...this.events];
      const oldEventIndex=updatedEvent.findIndex(p=>p.id ===id);
      const event:Event={
        id: id,
        title: title,
        date: date,
        organization:organization,
        location: location,
        capacity: capacity,
        category: category,
        TicketC1: TicketC1,
        TicketP1: TicketP1,
        TicketQ1: TicketQ1,
        description: description,
        imagePath: ""
      }
      updatedEvent[oldEventIndex]=event;
      this.events=updatedEvent;
      this.eventUpdated.next([...this.events]);
      this.router.navigate(['/event-list'])
    })
  }

  getView(param: boolean){
    return this.http.get<any>('http://localhost:3000/api/event', {params: {param}});
  }
  deleteEvent(eventId:string){
    this.http.delete('http://localhost:3000/api/event/'+ eventId)
    .subscribe(()=>{
      const updatedEvent=this.events.filter(event=>event.id !== eventId);
      this.events=updatedEvent;
      this.eventUpdated.next([...this.events]);
    })
  }
}
