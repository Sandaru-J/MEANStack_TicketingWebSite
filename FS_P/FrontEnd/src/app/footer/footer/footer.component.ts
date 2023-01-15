import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  footerMail: FormGroup;
  constructor() { }

  ngOnInit(): void {

    this.footerMail= new FormGroup({
      email: new FormControl(null,{validators:[Validators.required]}),
    });
  }

  onSend(){
    if(this.footerMail.invalid){
      return;
    }else{

    }
    console.log(this.footerMail.value);
  }

}
