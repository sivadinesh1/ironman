import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PhoneValidator } from '../../../../util/validators/phone.validator';

import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '../../../../services/loading.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SetupApiService } from '../../setup-api.service';

import { SubSink } from 'subsink';


import { ErrorService } from 'src/app/services/error.service';
import { SharedService } from 'src/app/services/shared.service';
import { NavController } from '@ionic/angular';

@Component({

  selector: 'app-add-trainers',
  templateUrl: './add-trainers.page.html',
  styleUrls: ['./add-trainers.page.scss', '../../setup.page.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTrainersPage implements OnInit {
  responsemsg: any;
  submitForm: FormGroup;

  errorObj: any;
  apiresponse: any;

  localData: any;
  currentSelected: any;

  genderSelected: any;

  private unsubscribe$ = new SubSink();

  levels = ['Silver', 'Gold', 'Platinum', 'Diamond'];
  gender = ['Male', 'Female'];

  validation_messages = {
    'firstname': [{ type: 'required', message: 'First Name is required.' }],
    'mobilenumber': [
      { type: 'required', message: 'Mobile Number is required.' },
      { type: 'pattern', message: 'Enter a valid Mobile Number.' },
      { type: 'invalidCountryPhone', message: 'Mobile Number seems wrong.' }
    ],
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'trainerfee': [
      { type: 'required', message: 'Trainer Fee is required.' },

    ],




  };

  constructor(private _fb: FormBuilder, private _setupapiservuce: SetupApiService,
    private _navController: NavController,
    private _authervice: AuthenticationService, private _errorservice: ErrorService,
    private _route: ActivatedRoute, private _cdr: ChangeDetectorRef, private _loadingservice: LoadingService,

    private _authservice: AuthenticationService) {


  }





  ionViewWillEnter() {

  }



  ngOnInit() {

    const country = new FormControl(SharedService.countries[0], Validators.required);

    this.submitForm = this._fb.group({

      trainuser: this._fb.group({
        username: [],
        profileimgurl: ['/assets/images/dummy-profile.png'],
        socialid: [],
        status: ['Y'],
        verified: ['Y'],
        gender: [null, Validators.required],
        dob: [],
        signup_mode: ['CA'],
        firstname: [null, Validators.required],
        mobilenumber: [null, Validators.compose([
          Validators.required, PhoneValidator.invalidCountryPhone(country)
        ])],

        email: [null, Validators.compose([
          Validators.required,
          Validators.pattern(SharedService.EMAIL_REGEX)
        ])],
        center: [this._authervice.center],
        // createdby: [this._authservice.loggedinuserid],
        // createddatetime: [new Date()],
        // updatedby: [null],
        // updateddatetime: [null],

      }),

      trainerfee: [null, Validators.compose([
        Validators.required
      ])],
      level: [null, Validators.required],

      createdby: [this._authservice.loggedinuserid],
      createddatetime: [new Date()],
      updatedby: [null],
      updateddatetime: [null],

    });




    this._cdr.markForCheck();

  }



  doSubmit(): void {

    this.submitForm.patchValue({ 'trainuser': { 'username': this.submitForm.value.trainuser.mobilenumber } });



    this.unsubscribe$.sink = this._setupapiservuce.addTrainer(this.submitForm.value).subscribe(data => {

      this.apiresponse = data;

      if (this.apiresponse.message === 'ERROR') {
        this._loadingservice.presentToastWithOptions(this.apiresponse.additionalinfo, 'middle', false, '');
      } else if (this.apiresponse.message === 'SUCCESS') {
        this.submitForm.reset();
        this._loadingservice.routeAfter(600, `/app/settings/list-trainers/${this._authservice.center.id}`, 'Trainer Added Successfylly', 'middle', false, '');
      }

      this._cdr.markForCheck();

    }

    );

  }

  goDash() {

  }

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }

  goListCenters() {
    this._navController.navigateBack(['/app/settings/list-centers']);
  }

  onItemClicked(idx, item) {
    this.currentSelected = idx;

    this.submitForm.patchValue({
      level: item,
    });

  }

  onGenderClicked(idx, item) {
    this.genderSelected = idx;
    this.submitForm.patchValue({ 'trainuser': { 'gender': item } });
  }

}

