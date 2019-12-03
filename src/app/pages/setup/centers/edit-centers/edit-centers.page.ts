import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SetupApiService } from '../../setup-api.service';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingService } from 'src/app/services/loading.service';

import { PhoneValidator } from 'src/app/util/validators/phone.validator';

import { SubSink } from 'subsink';

import { ErrorService } from 'src/app/services/error.service';
import { SharedService } from 'src/app/services/shared.service';
import { ICenters } from '../centers';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-centers',
  templateUrl: './edit-centers.page.html',
  styleUrls: ['./edit-centers.page.scss', '../../setup.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCentersPage implements OnInit {
  xdata: ICenters;

  submitForm: FormGroup;

  errorObj: any;

  apiresponse: any;

  private unsubscribe$ = new SubSink();


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
    'city': [
      { type: 'required', message: 'City is required.' },

    ],
    'pincode': [
      { type: 'required', message: 'Pincode is required.' },

    ]



  };

  constructor(private _fb: FormBuilder, private _setupapiservuce: SetupApiService,
    private _navController: NavController, private _router: Router,
    private _authservice: AuthenticationService, private _errorservice: ErrorService,
    private _route: ActivatedRoute, private _cdr: ChangeDetectorRef, private _loadingservice: LoadingService,

  ) {

    this.unsubscribe$.sink = this._route.queryParams.subscribe(params => {
      if (this._router.getCurrentNavigation().extras.state) {
        this.xdata = this._router.getCurrentNavigation().extras.state.center;
      }
    });


    const country = new FormControl(SharedService.countries[0], Validators.required);

    this.submitForm = this._fb.group({
      id: [null, Validators.required],
      name: [null, Validators.required],
      corporate: [],
      details: this._fb.group({
        contact: this._fb.group({
          phone: [null, Validators.compose([Validators.required,
          PhoneValidator.invalidCountryPhone(country)])],

          email: [null, Validators.compose([Validators.required,
          Validators.pattern(SharedService.EMAIL_REGEX)])]
        }),

        address: this._fb.group({
          line1: [null, Validators.compose([Validators.required])],
          line2: [null],
          city: [null, Validators.compose([Validators.required])],

          pincode: [null, Validators.compose([Validators.required,
          Validators.pattern(SharedService.PINCODE_REGEX)])],

        }),
      }),
      isactive: ['Y'],
      createdby: [],
      createddatetime: [],
      updatedby: [this._authservice.loggedinuserid],
      updateddatetime: [new Date()],
    });

  }


  ngOnInit() {
  }

  ionViewWillEnter() {
    

    this.submitForm.patchValue({
      id: this.xdata.id, name: this.xdata.name, corporate: this.xdata.corporate,
      isactive: this.xdata.isactive, createdby: this.xdata.createdby, createddatetime: this.xdata.createddatetime
    });

    this.submitForm.patchValue({ 'details': { 'contact': { 'phone': this.xdata.details.contact.phone } } });
    this.submitForm.patchValue({ 'details': { 'contact': { 'email': this.xdata.details.contact.email } } });

    this.submitForm.patchValue({ 'details': { 'address': { 'line1': this.xdata.details.address.line1 } } });
    this.submitForm.patchValue({ 'details': { 'address': { 'line2': this.xdata.details.address.line2 } } });
    this.submitForm.patchValue({ 'details': { 'address': { 'city': this.xdata.details.address.city } } });
    this.submitForm.patchValue({ 'details': { 'address': { 'pincode': this.xdata.details.address.pincode } } });

    this._cdr.markForCheck();
  }


  doSubmit(): void {


    this.unsubscribe$.sink = this._setupapiservuce.updateCenter(this.submitForm.value).subscribe(
      data => {
        this.apiresponse = data;

        if (this.apiresponse.body.message === 'SUCCESS') {
          this._loadingservice.routeAfter(600, `/app/settings/list-centers`, 'Details Updation Successful', 'bottom', false, '');
        }
      }

    );

  }


  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }

  gotoListCenters() {
    if (!this.submitForm.pristine || this.submitForm.touched) {
      this._loadingservice.confirmLeaving('/app/settings/list-centers', this.submitForm);
    } else {
      this._navController.navigateBack(['/app/settings/list-centers']);

    }


  }

}


// this._navController.navigateBack(['/app/list-centers']);