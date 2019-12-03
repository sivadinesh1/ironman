import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SubSink } from 'subsink';
import { SetupApiService } from '../../setup-api.service';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { SharedService } from 'src/app/services/shared.service';
import { PhoneValidator } from 'src/app/util/validators/phone.validator';
import { ErrorService } from 'src/app/services/error.service';


@Component({
  selector: 'app-edit-ca',
  templateUrl: './edit-ca.page.html',
  styleUrls: ['./edit-ca.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCaPage implements OnInit {

  xdata: any;

  responsemsg: any;
  submitForm: FormGroup;

  errorObj: any;
  apiresponse: any;

  localData: any;
  currentSelected: any;

  genderSelected: any;

  private unsubscribe$ = new SubSink();


  gender = ['Male', 'Female'];
  genders = [
    { 'gender': 'Male', 'selected': false },
    { 'gender': 'Female', 'selected': false }
  ];

  listGenderItems = [];
  chosenGender: any;

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
    ]

  };

  constructor(private _fb: FormBuilder, private _setupapiservuce: SetupApiService,
    private _navController: NavController, private _router: Router,
    private _authservice: AuthenticationService,
    private _route: ActivatedRoute, private _cdr: ChangeDetectorRef, private _loadingservice: LoadingService,

  ) {
    this.unsubscribe$.sink = this._route.queryParams.subscribe(params => {

      if (this._router.getCurrentNavigation().extras.state) {
        this.xdata = this._router.getCurrentNavigation().extras.state.ca;
      }
    });
  }


  ngOnInit() {


    const country = new FormControl(SharedService.countries[0], Validators.required);

    this.submitForm = this._fb.group({

      id: [],
      username: [],
      profileimgurl: [],
      soclialid: [],
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



    });




    this._cdr.markForCheck();
  }


  ionViewWillEnter() {

    this.submitForm.patchValue({ 'id': this.xdata.id });
    this.submitForm.patchValue({ 'firstname': this.xdata.firstname });
    this.submitForm.patchValue({ 'username': this.xdata.username });


    this.submitForm.patchValue({ 'gender': this.xdata.gender });


    this.submitForm.patchValue({ 'mobilenumber': this.xdata.mobilenumber });
    this.submitForm.patchValue({ 'email': this.xdata.email });
    this.submitForm.patchValue({ 'createdby': this.xdata.createdby });
    this.submitForm.patchValue({ 'createddatetime': this.xdata.createddatetime });




    this.genders.forEach(element => {
      if (this.xdata.gender === element.gender) {
        this.listGenderItems.push({ gender: element.gender, selected: true });
        this.chosenGender = element.gender;
      } else {
        this.listGenderItems.push({ gender: element.gender, selected: false });
      }
    });


    this._cdr.markForCheck();
  }

  onGenderClick(item) {

    this.listGenderItems.forEach(e => {
      e.selected = false;
    });

    if (item.selected) {
      item.selected = false;
    } else {
      item.selected = true;
    }
    this.chosenGender = item.gender;

  }

  doSubmit(): void {



    this.submitForm.patchValue({ 'gender': this.chosenGender });

    this.unsubscribe$.sink = this._setupapiservuce.editCa(this.submitForm.value).subscribe(data => {

      this.apiresponse = data;

      if (this.apiresponse.message === 'ERROR') {
        this._loadingservice.presentToastWithOptions(this.apiresponse.additionalinfo, 'middle', false, '');
        this._cdr.markForCheck();
      } else if (this.apiresponse.message === 'SUCCESS') {
        this.submitForm.reset();
        this._loadingservice.routeAfter(600, `/app/settings/list-ca/${this._authservice.center.id}`, 'Center Admin Edited Successfylly', 'middle', false, '');
      }

      this._cdr.markForCheck();

    }

    );

  }

}
