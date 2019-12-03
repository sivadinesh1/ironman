import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { CommonApiService } from 'src/app/services/common-api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SubSink } from 'subsink';
import { ErrorObject } from 'src/app/util/errorobject';
import * as myGlobals from '../../../services/globals';

@Component({
  selector: 'app-verify-mobile-number',
  templateUrl: './verify-mobile-number.page.html',
  styleUrls: ['./verify-mobile-number.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyMobileNumberPage implements OnInit {
  paramsSubscription: Subscription;
  rawUserData: any;

  errorObj: ErrorObject;

  @ViewChild('p1', { static: true }) p1;
  @ViewChild('p2', { static: true }) p2;
  @ViewChild('p3', { static: true }) p3;
  @ViewChild('p4', { static: true }) p4;
  @ViewChild('p5', { static: true }) p5;
  @ViewChild('p6', { static: true }) p6;

  //verifyForm: FormGroup;
  verifyDisabled = true;
  apiresponse: any;

  phonenumber: any;
  otpsent: any;
  otpsendstatus: any;
  otpstatus: any;
  username: any;
  userid: any;

  responsemsg: any;

  private unsubscribe$ = new SubSink();

  constructor(private _route: ActivatedRoute, private _fb: FormBuilder,
    private authenticationService: AuthenticationService, private route: ActivatedRoute,
    private loadingservice: LoadingService, private router: Router,
    private commonApiService: CommonApiService,
    private cdr: ChangeDetectorRef) {
    this.username = this.route.snapshot.paramMap.get('username');
    this.userid = this.route.snapshot.paramMap.get('userid');
    console.log('username  > ' + this.username + '  ' + this.userid);

  }

  ngOnInit() {

    this.unsubscribe$.sink = this._route.data.subscribe(data => {
      this.rawUserData = data['rawuserdata'];

      this.phonenumber = this.rawUserData.obj.mobilenumber;
    });

    // this.verifyForm = this._fb.group({
    //   'p1': new FormControl(null),
    //   'p2': new FormControl(null),
    //   'p3': new FormControl(null),
    //   'p4': new FormControl(null),
    //   'p5': new FormControl(null),
    //   'p6': new FormControl(null),

    // });
  }


  fillOTP(number) {

    if (number === '-1') {
      if (this.p6.nativeElement.value.length !== 0) {
        this.p6.nativeElement.value = '';
        this.moveOnMax('p5');
      } else if (this.p5.nativeElement.value.length !== 0) {
        this.p5.nativeElement.value = '';
        this.moveOnMax('p4');
      } else if (this.p4.nativeElement.value.length !== 0) {
        this.p4.nativeElement.value = '';
        this.moveOnMax('p3');
      } else if (this.p3.nativeElement.value.length !== 0) {
        this.p3.nativeElement.value = '';
        this.moveOnMax('p2');
      } else if (this.p2.nativeElement.value.length !== 0) {
        this.p2.nativeElement.value = '';
        this.moveOnMax('p1');
      } else if (this.p1.nativeElement.value.length !== 0) {
        this.p1.nativeElement.value = '';

      }
    } else {
      if (this.p1.nativeElement.value.length === 0) {
        this.p1.nativeElement.value = number;
        this.moveOnMax('p2');
      } else if (this.p2.nativeElement.value.length === 0) {
        this.p2.nativeElement.value = number;
        this.moveOnMax('p3');
      } else if (this.p3.nativeElement.value.length === 0) {
        this.p3.nativeElement.value = number;
        this.moveOnMax('p4');
      } else if (this.p4.nativeElement.value.length === 0) {
        this.p4.nativeElement.value = number;
        this.moveOnMax('p5');
      } else if (this.p5.nativeElement.value.length === 0) {
        this.p5.nativeElement.value = number;
        this.moveOnMax('p6');
      } else if (this.p6.nativeElement.value.length === 0) {
        this.p6.nativeElement.value = number;
        this.verifyDisabled = false;
      }
    }

  }

  moveOnMax(nextFieldID) {
    this.cdr.detectChanges();

    if (nextFieldID === 'p1') {
      this.p1.nativeElement.focus();
    } else if (nextFieldID === 'p2') {
      this.p2.nativeElement.focus();
    } else if (nextFieldID === 'p3') {
      this.p3.nativeElement.focus();
    } else if (nextFieldID === 'p4') {
      this.p4.nativeElement.focus();
    } else if (nextFieldID === 'p5') {
      this.p5.nativeElement.focus();
    } else if (nextFieldID === 'p6') {
      this.p6.nativeElement.focus();
    }

    this.cdr.markForCheck();
  }








  async onVerifyOTP() {

    // tslint:disable-next-line:max-line-length
    const otpentered = `${this.p1.nativeElement.value}${this.p2.nativeElement.value}${this.p3.nativeElement.value}${this.p4.nativeElement.value}${this.p5.nativeElement.value}${this.p6.nativeElement.value}`

    console.log('print otpentered  >' + otpentered);



    const otpsessionid = await this.authenticationService.getLocalStoreItems('otpsessionid');

    console.log('print otpentered  1 >>> ' + otpsessionid);

    this.unsubscribe$.sink = this.commonApiService.verifyOTP(otpsessionid, otpentered).subscribe(
      async data => {
        this.apiresponse = data;
        console.log('adfas>> ' + JSON.stringify(this.apiresponse));

        if (this.apiresponse.message === 'SUCCESS') {
          this.otpsent = true;
          this.otpsendstatus = '';

          if (this.apiresponse.obj.details === 'OTP Matched') {
            this.otpstatus = 'OTP Verification Successful.';

            this.unsubscribe$.sink = this.commonApiService.updateUserVerified(this.phonenumber).subscribe(dat => {
              console.log('object ' + dat);
            },
              error => {

                this.errorObj = new ErrorObject(myGlobals.appid, '', '', `verifyOTP@failure=${this.phonenumber},`, error, `browser`);

                this.unsubscribe$.sink = this.commonApiService.captureError(this.errorObj).subscribe(
                  data => {
                    console.log('object' + JSON.stringify(data));
                  }
                );


                this.responsemsg = this.authenticationService.errormsg;
                this.cdr.markForCheck();
              }
            );



            this.router.navigate([`app/dashboard/${this.userid}`]);
            this.loadingservice.presentToastWithOptions('OTP Verification Successful.', 'middle', false, '');

          }



        } else if (this.apiresponse.message === 'ERROR') {
          this.otpstatus = 'OTP Verification Failed.';


          return false;
        }

        this.cdr.markForCheck();
      },
      error => console.error(error)
    );

  }

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }

}
