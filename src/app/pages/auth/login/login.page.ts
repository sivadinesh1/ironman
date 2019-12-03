import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PhoneValidator } from 'src/app/util/validators/phone.validator';
import { CountryPhone } from 'src/app/util/validators/country-phone.model';
import { AuthApiService } from '../authApi.service';
import { CommonApiService } from 'src/app/services/common-api.service';
import { ErrorObject } from 'src/app/util/errorobject';
import * as myGlobals from '../../../services/globals';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: [
    './styles/login.page.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  invalidLogin = false;

  countries: Array<CountryPhone>;
  responsemsg: any;
  apiresponse: any;

  errorObj: ErrorObject;

  validation_messages = {
    'phone': [
      { type: 'required', message: 'Phone Number is required.' },
      { type: 'pattern', message: 'Enter a valid Phone Number.' },
      { type: 'invalidCountryPhone', message: 'Mobile Number seems wrong.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  private unsubscribe$ = new SubSink();

  constructor(
    public router: Router, private authApi: AuthApiService, private commonApiservice: CommonApiService,
    private cdr: ChangeDetectorRef,
    public menu: MenuController, private authenticationService: AuthenticationService,
  ) {

    // displays sample phone # in UI, placeholder="{{ this.countries[0].sample_phone }}"
    this.countries = [
      new CountryPhone('IN', 'India'),
      new CountryPhone('US', 'United States'),

    ];

    const country = new FormControl(this.countries[0], Validators.required);

    this.loginForm = new FormGroup({

      'phone': new FormControl('', Validators.compose([
        Validators.required, PhoneValidator.invalidCountryPhone(country)
      ])),



      'password': new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ]))
    });





  }

  ngOnInit(): void {
    this.menu.enable(true);
  }





  doFacebookLogin(): void {
    console.log('facebook login');
    this.router.navigate(['auth/fb-login']);
  }

  doGoogleLogin(): void {
    console.log('google login');
    this.router.navigate(['auth/gp-login']);
  }



  doLogin(): void {

    let username = this.loginForm.controls.phone.value;
    let password = this.loginForm.controls.password.value;

    console.log('object ' + username);
    console.log('object ' + password);

    this.unsubscribe$.sink = this.authenticationService.authenticate(username, password).subscribe(
      async data => {

        if (data.message === 'SUCCESS') {

          console.log('object......' + JSON.stringify(data.obj));

          let role = data.obj.role;
          this.authenticationService.setRole(role);
          this.authenticationService.setUserid(data.obj.id);

          if (role === 'superadmin') {
            this.router.navigate([`app/dashboard/super-admin-dashboard/${data.obj.id}`]);
            this.invalidLogin = false;
            this.cdr.markForCheck();
          } else if (role === 'corporate') {
            this.router.navigate([`app/dashboard/corporate-dashboard/${data.obj.id}`]);
            this.invalidLogin = false;
            this.cdr.markForCheck();
          } else if (role === 'centeradmin') {
            this.router.navigate([`app/dashboard/admin-dashboard/${data.obj.id}`]);
            this.invalidLogin = false;
            this.cdr.markForCheck();
          } else if (role === 'member') {

            this.router.navigate([`app/dashboard/member-dashboard/${data.obj.id}`]);
            this.invalidLogin = false;
            this.cdr.markForCheck();
          } else if (role === 'trainer') {
            this.router.navigate([`app/dashboard/trainer-dashboard/${data.obj.id}`]);
            this.invalidLogin = false;
            this.cdr.markForCheck();
          }


        } else if (data.message === 'FAILURE') {
          this.invalidLogin = true;

          if (data.additionalinfo === 'INVALID_CREDENTIALS') {
            this.responsemsg = "Login Failed. Invalid Credentials";
          } else if (data.additionalinfo === 'USER_NOT_FOUND') {
            this.responsemsg = "User not found.";
          } else if (data.additionalinfo === 'PENDING_VERIFICATION') {
            this.responsemsg = "PENDING_VERIFICATION";
            this.sendOTP(username);
            this.router.navigate([`auth/verify-mobile-number/${username}/${data.obj.id}`]);
          }
          this.cdr.markForCheck();

        }


      }

    );

  }



  sendOTP(phonenumber) {

    this.unsubscribe$.sink = this.commonApiservice.sendOTP(phonenumber).subscribe(
      data => {
        this.apiresponse = data;

        if (this.apiresponse.body.message === 'SUCCESS') {

          this.authenticationService.setLocalStoreItems('otpsessionid', this.apiresponse.body.obj.details);

          console.log('session id >> ' + this.apiresponse.body.obj.details);

          this.cdr.markForCheck();
          console.log('session id >> CLOSED ');

          this.cdr.markForCheck();

        } else if (this.apiresponse.body.message === 'ERROR') {

          this.responsemsg = 'OTP Not Sent, Check internet Connection';


          this.cdr.markForCheck();

        }

      },
      error => {

        this.errorObj = new ErrorObject(myGlobals.appid, '', '', `sendOTP@failure=${phonenumber},`, error, `browser`);

        this.unsubscribe$.sink = this.commonApiservice.captureError(this.errorObj).subscribe(
          data => {
            console.log('object' + JSON.stringify(data));
          }
        );


        this.responsemsg = this.authenticationService.errormsg;
        this.cdr.markForCheck();
      }
    );


  }

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }

}


