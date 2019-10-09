import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, MenuController } from '@ionic/angular';

import { PasswordValidator } from '../../../util/validators/password.validator';
import { TermsOfServicePage } from '../../../commons/terms-of-service/terms-of-service.page';
import { PrivacyPolicyPage } from '../../../commons/privacy-policy/privacy-policy.page';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CountryPhone } from 'src/app/util/validators/country-phone.model';
import { PhoneValidator } from 'src/app/util/validators/phone.validator';
import { CommonApiService } from 'src/app/services/common-api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { SubSink } from 'subsink';
import { ErrorObject } from 'src/app/util/errorobject';
import * as myGlobals from '../../../services/globals';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: [
    './styles/signup.page.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  matching_passwords_group: FormGroup;
  invalidLogin = false;
  responsemsg: any;
  apiresponse: any;
  otpsent: any;
  otpsendstatus: any;
  errorObj: ErrorObject;

  //returnflag = false;

  validation_messages = {
    'phone': [
      { type: 'required', message: 'Phone Number is required.' },
      { type: 'pattern', message: 'Enter a valid Phone Number.' },
      { type: 'invalidCountryPhone', message: 'Mobile Number seems wrong.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' }
    ],
    'matching_passwords': [
      { type: 'areNotEqual', message: 'Password mismatch' }
    ]
  };

  countries: Array<CountryPhone>;

  private unsubscribe$ = new SubSink();

  constructor(
    public router: Router, private commonApiservice: CommonApiService,
    public modalController: ModalController, private authenticationService: AuthenticationService,
    public menu: MenuController, private cdr: ChangeDetectorRef, private loadingservice: LoadingService,
  ) {
    this.countries = [
      new CountryPhone('IN', 'India'),
      new CountryPhone('US', 'United States'),

    ];

    const country = new FormControl(this.countries[0], Validators.required);

    this.matching_passwords_group = new FormGroup({
      'password': new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      'confirm_password': new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areNotEqual(formGroup);
    });


    this.signupForm = new FormGroup({
      'phone': new FormControl('', Validators.compose([
        Validators.required, PhoneValidator.invalidCountryPhone(country)
      ])),
      'matching_passwords': this.matching_passwords_group
    });
  }





  ngOnInit(): void {
    this.menu.enable(false);
  }

  async showTermsModal() {
    const modal = await this.modalController.create({
      component: TermsOfServicePage
    });
    return await modal.present();
  }

  async showPrivacyModal() {
    const modal = await this.modalController.create({
      component: PrivacyPolicyPage
    });
    return await modal.present();
  }



  doFacebookSignup(): void {
    console.log('facebook signup');
    this.router.navigate(['app/categories']);
  }

  doGoogleSignup(): void {
    console.log('google signup');
    this.router.navigate(['app/categories']);
  }


  async doSignup(): Promise<void> {

    let username = this.signupForm.controls.phone.value;
    let password = this.signupForm.controls.matching_passwords.value.password;

    console.log('object ' + username);
    console.log('object ' + password);

    this.sendOTP(username, password);





  }


  sendOTP(phonenumber, password) {

    this.unsubscribe$.sink = this.commonApiservice.sendOTP(phonenumber).subscribe(
      data => {
        this.apiresponse = data;
        console.log('adfas>> ' + JSON.stringify(this.apiresponse));
        console.log('sdsd>>>>>>' + this.apiresponse.body.message);

        if (this.apiresponse.body.message === 'SUCCESS') {

          this.authenticationService.setLocalStoreItems('otpsessionid', this.apiresponse.body.obj.details);

          this.otpsent = true;
          this.otpsendstatus = '';

          console.log('session id >> ' + this.apiresponse.body.obj.details);

          this.cdr.markForCheck();
          console.log('session id >> CLOSED ');
          //     this.returnflag = true;
          this.cdr.markForCheck();
          this.register(phonenumber, password);
        } else if (this.apiresponse.body.message === 'ERROR') {

          this.responsemsg = 'OTP Not Sent, Check internet Connection';
          this.loadingservice.dismiss();

          this.cdr.markForCheck();
          //   this.returnflag = false;
        }



      },
      error => {
        console.error(error)
        //  this.returnflag = false;
      }
    );


  }


  register(username, password) {
    this.unsubscribe$.sink = this.authenticationService.register(username, password).subscribe(
      data => {
        console.log('object>>>>>>>>>>>>>>>>>>>>>>>' + JSON.stringify(data));
        if (data.message === 'SUCCESS') {
          this.router.navigate([`auth/verify-mobile-number/${username}/${data.obj.id}`]);
          this.invalidLogin = false;
        } else if (data.message === 'FAILURE') {
          if (data.additionalInfo === 'DUPLICATE_USER') {
            this.responsemsg = "Duplicate User";
          } else if (data.additionalInfo === 'USER_NOT_EXIST') {
            this.responsemsg = "Mobile number is not associated with partner Gyms. Please contact your Gym to get this resolved. ";
          } else if (data.additionalInfo === 'SERVER_ERROR') {
            this.responsemsg = 'Server Error. Contact Administrator.'
          } else {
            this.responsemsg = "Signup Failure";
          }
          this.invalidLogin = true;
        }
        this.cdr.markForCheck();
      },
      error => {

        this.errorObj = new ErrorObject(myGlobals.appid, '', '', `register@username=${username},password=${password}`, error, `browser`);

        this.unsubscribe$.sink = this.commonApiservice.captureError(this.errorObj).subscribe(
          data => {
            console.log('object' + JSON.stringify(data));
          }
        );

        this.invalidLogin = true;
        this.responsemsg = this.authenticationService.errormsg;
        this.cdr.markForCheck();
      }
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }


}
