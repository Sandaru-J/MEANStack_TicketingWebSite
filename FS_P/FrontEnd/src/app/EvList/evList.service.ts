import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Event} from '..//Admin/event/event.models';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class EvListService{

  private events: Event[] = [];
  private eventUpdated = new Subject<Event[]>();

  constructor(private http:HttpClient,private router:Router){}

  ViewEvents(){
     return this.http.get("http://localhost:3000/api/event")
  }

}
