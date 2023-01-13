import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { evBookingService } from '../booking/evBooking.service';
import { BkData } from '../booking/bookingdata.model';


@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;
  total: any=1000;

  constructor(private evBookingService:evBookingService) { }

  ngOnInit(): void {
    this.initConfig();
  }

  // ReqTotal():void{
  //   this.evBookingService.getBookingTotal().subscribe((data)=>{
  //       this.total=this.total/365;
  //     this.total=data;
  //     console.log(this.total);
  //   });
  //}
  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'AcDQqjOJxiipsu0vurDH1TIM6bYMoxAVmUXkR9_Ii251pXVnWcDWuKeAeKXFjlHzaNRWHXvpS7Jg-dXk',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: this.total,
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: this.total
                        }
                    }
                },
                items: [{
                    name: 'Enterprise Subscription',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'USD',
                        value: this.total,
                    },
                }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details: any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            //this.evBookingService.sendMail();

        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            this.evBookingService.sendMail();

        },
        onError: err => {
            console.log('OnError', err);
        },
        onClick: (data: any, actions: any) => {
            console.log('onClick', data, actions);

        }
    };
}
}
