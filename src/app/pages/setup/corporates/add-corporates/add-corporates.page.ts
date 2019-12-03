import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PhoneValidator } from '../../../../util/validators/phone.validator';

import { LoadingService } from '../../../../services/loading.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SetupApiService } from '../../setup-api.service';

import { SubSink } from 'subsink';

import { SharedService } from 'src/app/services/shared.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-corporates',
  templateUrl: './add-corporates.page.html',
  styleUrls: ['./add-corporates.page.scss', '../../setup.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCorporatesPage implements OnInit {
  responsemsg: any;
  submitForm: FormGroup;

  apiresponse: any;
  loggedinUserId: any;
  
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
      { type: 'pattern', message: 'Enter a valid pincode.' }

    ]



  };

  constructor(private _fb: FormBuilder, private _setupapiservuce: SetupApiService,
    private _navController: NavController,
    private _cdr: ChangeDetectorRef, private _loadingservice: LoadingService,
    private _authservice: AuthenticationService) {


  }


  


  ionViewWillEnter() {
  
  }

  ngOnInit() {

    const country = new FormControl(SharedService.countries[0], Validators.required);

    this.submitForm = this._fb.group({

      name: [null, Validators.required],

      details: this._fb.group({
        contact: this._fb.group({
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

          line2: [''],

          city: [null, Validators.compose([
            Validators.required
          ])],

          pincode: [null, Validators.compose([
            Validators.required,
            Validators.pattern(SharedService.PINCODE_REGEX)
          ])],

        }),

      }),
      isactive: ['Y'],
      // createdby: [this._authservice.loggedinuserid],
      // createddatetime: [new Date()],
      // updatedby: [],
      // updateddatetime: [null],


    });

    this._cdr.markForCheck();

  }


  doSubmit(): void {

    let formvalue = this.submitForm.value;

    this.unsubscribe$.sink = this._setupapiservuce.addCorporate(formvalue).subscribe((data) => {

      this.apiresponse = data;

      if (this.apiresponse.message === 'SUCCESS') {
        this.submitForm.reset();
        this._loadingservice.routeAfter(600, `/app/settings/list-corporates`, 'Corporate Added Successfylly', 'middle', false, '');
      } else if (this.apiresponse.message === 'ERROR') {
        this._loadingservice.presentToastWithOptions(this.apiresponse.additionalinfo, 'middle', false, '');
      }

      this._cdr.markForCheck();

    });
  }


  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }

  goListCorp() {
    this._navController.navigateBack([`/app/settings/list-corporates`]);
  }

}

