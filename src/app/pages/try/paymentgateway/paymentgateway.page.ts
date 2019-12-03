

import { ActivatedRoute } from '@angular/router';

import { Component, OnInit, ChangeDetectorRef, ElementRef, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { CommonApiService } from 'src/app/services/common-api.service';

@Component({
  selector: 'app-paymentgateway',
  templateUrl: './paymentgateway.page.html',
  styleUrls: ['./paymentgateway.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentgatewayPage implements OnInit {

  paytmdata: any;
  @ViewChild('form',  {static: true}) form: ElementRef;
  
  CHECKSUMHASH: any;
  MID: any;
  ORDER_ID: any;
  CUST_ID: any;
  INDUSTRY_TYPE_ID: any;
  CHANNEL_ID: any;
  TXN_AMOUNT: any;

  WEBSITE: any;
  EMAIL: any;
  MOBILE_NO: any;
  CALLBACK_URL: any;

  resultss: any;

  constructor(private _commonApiService: CommonApiService,
    private _route: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
    ) { 
      this.paytmdata = this._route.snapshot.data['userdata'];

      console.log('object paytmdata >>> ' + this.paytmdata);

     // this.checksumhash =  this.paytmdata.obj.checksumhash;
      this.MID   =  this.paytmdata.obj.mid;
  this.ORDER_ID =  this.paytmdata.obj.order_id;
  this.CUST_ID =  this.paytmdata.obj.cust_id;
  this.INDUSTRY_TYPE_ID =  this.paytmdata.obj.industry_type_id;
  this.CHANNEL_ID =  this.paytmdata.obj.channel_id;
  this.TXN_AMOUNT =  this.paytmdata.obj.txn_amount;

  this.WEBSITE =  this.paytmdata.obj.website;
  this.EMAIL =  this.paytmdata.obj.email;
  this.MOBILE_NO =  this.paytmdata.obj.mobile_no;
  this.CALLBACK_URL =  this.paytmdata.obj.callback_url;
  this.CHECKSUMHASH = this.paytmdata.obj.checksumhash;

      console.log('object checksumhash >>> ' + this.CHECKSUMHASH);

    }

  ngOnInit() {

    // this._commonApiService.payTMgetChecksum().subscribe(data => {
    //   this.paytmdata = data;
    //   console.log('object get paytm checksum ' + JSON.stringify(this.paytmdata));

    //   console.log('object checksumhash >> ' + this.paytmdata.obj.checksumhash);
    //   this.checksumhash = this.paytmdata.obj.checksumhash;

    //   this._cdr.markForCheck();
    // });



  }

  ngAfterViewInit() {
  
    this.form.nativeElement.submit();
  }


  // submitForm() {
  //   this.form.nativeElement.submit();
  // }

}
