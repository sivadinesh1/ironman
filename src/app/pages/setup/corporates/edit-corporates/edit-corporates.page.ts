import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SetupApiService } from '../../setup-api.service';
import { CommonApiService } from 'src/app/services/common-api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingService } from 'src/app/services/loading.service';
import { CountryPhone } from 'src/app/util/validators/country-phone.model';
import { PhoneValidator } from 'src/app/util/validators/phone.validator';

import { SubSink } from 'subsink';
import { ICorporates } from '../corporates';
import { ErrorService } from 'src/app/services/error.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-edit-corporates',
  templateUrl: './edit-corporates.page.html',
  styleUrls: ['./edit-corporates.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCorporatesPage implements OnInit {
  xdata: ICorporates;

  zdata: any;

  submitForm: FormGroup;

  errorObj: any;

  name: any;
  phone: any;
  email: any;

  line1: any;
  line2: any;
  state: any;
  pincode: any;
  id: any;

  responsemsg: any;

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

    ]



  };

  constructor(private _fb: FormBuilder, private _setupapiservuce: SetupApiService,
    private _commonapiservice: CommonApiService, private _router: Router,
    private _authenticationservice: AuthenticationService, private _errorservice: ErrorService,
    private _route: ActivatedRoute, private _cdr: ChangeDetectorRef, private _loadingservice: LoadingService,

    private _authservice: AuthenticationService) {

    this.unsubscribe$.sink = this._route.queryParams.subscribe(params => {
      if (this._router.getCurrentNavigation().extras.state) {
        this.xdata = this._router.getCurrentNavigation().extras.state.corporate;
      }
    });



    this._cdr.markForCheck();

    // this.countries = [
    //   new CountryPhone('IN', 'India'),
    //   new CountryPhone('US', 'United States'),

    // ];

    //const country = SharedService.country;

    const country = new FormControl(SharedService.countries[0], Validators.required);

    // const country = new FormControl(, Validators.required);

    this.submitForm = this._fb.group({
      id: [null, Validators.required],
      name: [null, Validators.required],

      contacts: this._fb.group({
        phone: [null, Validators.compose([
          Validators.required, PhoneValidator.invalidCountryPhone(country)
        ])],

        email: [null, Validators.compose([
          Validators.required,
          Validators.pattern(SharedService.EMAIL_REGEX)

        ])]

      }),

      address: this._fb.group({
        line1: [null, Validators.compose([
          Validators.required
        ])],

        line2: [null, Validators.compose([
          Validators.required
        ])],

        state: [null, Validators.compose([
          Validators.required
        ])],

        pincode: [null, Validators.compose([
          Validators.required,
          Validators.pattern(SharedService.PINCODE_REGEX)
        ])],

      })
    });

  }


  ngOnInit() {
  }

  ionViewWillEnter() {

    this.id = this.xdata.id;
    this.name = this.xdata.name;
    this.phone = this.xdata.phone;
    this.email = this.xdata.email;

    this.line1 = this.xdata.line1;
    this.line2 = this.xdata.line2;
    this.state = this.xdata.state;
    this.pincode = this.xdata.pincode;

    const country = new FormControl(this.countries[0], Validators.required);

    this.submitForm.patchValue({
      id: this.id,
      name: this.name,

    });


    this.submitForm.patchValue({ 'contacts': { phone: this.phone } });
    this.submitForm.patchValue({ 'contacts': { email: this.email } });

    this.submitForm.patchValue({ 'address': { line1: this.line1 } });
    this.submitForm.patchValue({ 'address': { line2: this.line2 } });
    this.submitForm.patchValue({ 'address': { state: this.state } });
    this.submitForm.patchValue({ 'address': { pincode: this.pincode } });

  }


  doSubmit(): void {

    let formvalue = this.submitForm.value;


    this._loadingservice.present('');

    this.unsubscribe$.sink = this._setupapiservuce.updateCorporate(formvalue).subscribe(
      data => {

        this.apiresponse = data;

        if (this.apiresponse.body.message === 'SUCCESS') {
          this.responsemsg = 'Successfully Updated';
          this._loadingservice.dismissAfter(600, `/app/list-corporates`, 'Details Updation Successful', 'middle', false, '');
        }


        this._cdr.markForCheck();
      },
      error => {

        this._errorservice.logErrortoService(`updateCorporate@username=${formvalue}`, error);
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
