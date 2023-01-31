import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  loginForm= new FormGroup({
    'email':new FormControl('',{validators:[Validators.required,Validators.email]}),
    'password': new FormControl('',{validators:[Validators.required]})
  });

  ngOnInit(): void {
  }
  get f() { return this.loginForm.controls; }
  onSubmit(){
    if(this.loginForm.valid){
     if(this.loginForm.value.email=="1234@gmail.com" && this.loginForm.value.password=="1234"){
       this.router.navigate(['/admin/home']);
     }else{
       alert("Login Failed");
       this.loginForm.reset();
     }
    }else{
      alert("Invalid Email or Password");
      this.loginForm.reset();
    }
  }

}
