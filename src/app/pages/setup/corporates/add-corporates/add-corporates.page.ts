import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PhoneValidator } from '../../../../util/validators/phone.validator';
import { CommonApiService } from '../../../../services/common-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingService } from '../../../../services/loading.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SetupApiService } from '../../setup-api.service';

import { SubSink } from 'subsink';

import { CountryPhone } from '../../../../util/validators/country-phone.model';
import { ErrorService } from 'src/app/services/error.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-corporates',
  templateUrl: './add-corporates.page.html',
  styleUrls: ['./add-corporates.page.scss'],
})
export class AddCorporatesPage implements OnInit {
  responsemsg: any;
  submitForm: FormGroup;

  errorObj: any;
  apiresponse: any;

  private unsubscribe$ = new SubSink();
  countries: Array<CountryPhone>;

  validation_messages = {
    'phone': [
      { type: 'required', message: 'Phone Number is required.' },
      { type: 'pattern', message: 'Enter a valid Phone Number.' },
      { type: 'invalidCountryPhone', message: 'Mobile Number seems wrong.' }
    ],
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'line1': [
      { type: 'required', message: 'Line 1 is required.' },
    ],
    'state': [
      { type: 'required', message: 'State is required.' },

    ],
    'pincode': [
      { type: 'required', message: 'Pincode is required.' },
      { type: 'pattern', message: 'Enter a valid pincode.' }

    ]



  };

  constructor(private _fb: FormBuilder, private _setupapiservuce: SetupApiService,
    private _commonapiservice: CommonApiService, private _router: Router,
    private _authenticationservice: AuthenticationService, private _errorservice: ErrorService,
    private _route: ActivatedRoute, private _cdr: ChangeDetectorRef, private _loadingservice: LoadingService,

    private _authservice: AuthenticationService) {

    this.countries = [
      new CountryPhone('IN', 'India'),
      new CountryPhone('US', 'United States'),

    ];
  }



  ngOnInit() {
 //   const country = new FormControl(this.countries[0], Validators.required);

    this.submitForm = this._fb.group({
      name: [],
      phone: [],
      email: [],
      address: [],
    //  name: [null, Validators.required],

      // contacts: this._fb.group({
      //   phone: [null, Validators.compose([
      //     Validators.required, PhoneValidator.invalidCountryPhone(country)
      //   ])],

      //   email: [null, Validators.compose([
      //     Validators.required,
      //     Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      //   ])]

      // }),

      // address: this._fb.group({
      //   line1: [null, Validators.compose([
      //     Validators.required
      //   ])],

      //   line2: [null, Validators.compose([
      //     Validators.required
      //   ])],

      //   state: [null, Validators.compose([
      //     Validators.required
      //   ])],

      //   pincode: [null, Validators.compose([
      //     Validators.required,
      //     Validators.pattern(SharedService.PINCODE_REGEX)
      //   ])],


      // })






    });



    // DND - both are correct
    // this.submitForm.patchValue({
    //   profile: { line1: 'value 1', line2: 'value 2' }
    // });

    // this.submitForm.controls['profile'].patchValue({ line1: '1234567', line2: '1234' });


    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }






  doSubmit(): void {

    let formvalue = this.submitForm.value;

    this._loadingservice.present('');
    this.unsubscribe$.sink = this._setupapiservuce.addCorporate(formvalue).subscribe(data => {

      this.apiresponse = data;

      if (this.apiresponse.body.message === 'FAILURE') {
        this._loadingservice.presentToastWithOptions(this._authenticationservice.errormsg, 'middle', false, '');

        this._cdr.markForCheck();
      } else if (this.apiresponse.body.message === 'SUCCESS') {

        this._loadingservice.dismissAfter(600, `/app/list-corporates`, 'Corporate Added Successfylly', 'middle', false, '');
      }

      this._cdr.markForCheck();

    },
      error => {

        this._errorservice.logErrortoService(`addCorporate@`, error);
        this._loadingservice.dismiss();
        this._loadingservice.presentToastWithOptions(this._authenticationservice.errormsg, 'middle', false, '');

        this._cdr.markForCheck();

      }

    );

  }



  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }


}


