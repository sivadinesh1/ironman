import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SetupApiService } from '../../setup-api.service';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ErrorService } from 'src/app/services/error.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ICenters } from '../../centers/centers';
import { SubSink } from 'subsink';
import { SharedService } from 'src/app/services/shared.service';
import { PhoneValidator } from 'src/app/util/validators/phone.validator';
import { IUser } from '../../user';

import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-edit-trainers',
  templateUrl: './edit-trainers.page.html',
  styleUrls: ['./edit-trainers.page.scss'],
})
export class EditTrainersPage implements OnInit {
  xdata: any;

  submitForm: FormGroup;

  errorObj: any;

  apiresponse: any;

  private unsubscribe$ = new SubSink();

  levels = [
    { 'level': 'Silver', 'selected': false },
    { 'level': 'Gold', 'selected': false },
    { 'level': 'Platinum', 'selected': false },
    { 'level': 'Diamond', 'selected': false }
  ];

  listLevelsItems = [];
  chosenLevel: any;

  gender = ['Male', 'Female'];

  genders = [
    { 'gender': 'Male', 'selected': false },
    { 'gender': 'Female', 'selected': false }
  ];

  listGenderItems = [];
  chosenGender: any;

  imgurl: any;

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

  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = false;

  @ViewChild(ImageCropperComponent, { static: false }) imageCropper: ImageCropperComponent;

  constructor(private _fb: FormBuilder, private _setupapiservuce: SetupApiService,
    private _navController: NavController, private _router: Router,
    private _authservice: AuthenticationService, private _errorservice: ErrorService,
    private _route: ActivatedRoute, private _cdr: ChangeDetectorRef, private _loadingservice: LoadingService,

  ) {
    this.unsubscribe$.sink = this._route.queryParams.subscribe(params => {

      if (this._router.getCurrentNavigation().extras.state) {
        this.xdata = this._router.getCurrentNavigation().extras.state.trainers;
      }
    });
  }



  ngOnInit() {

    const country = new FormControl(SharedService.countries[0], Validators.required);

    this.submitForm = this._fb.group({
      id: [],

      trainuser: this._fb.group({
        id: [],
        username: [],
        profileimgurl: [],
        socialid: [],
        status: ['Y'],
        verified: ['Y'],
        gender: [null, Validators.required],
        dob: [],
        file: [null],
        filename: [null],
        firstname: [null, Validators.required],
        mobilenumber: [null, Validators.compose([
          Validators.required, PhoneValidator.invalidCountryPhone(country)
        ])],

        email: [null, Validators.compose([
          Validators.required,
          Validators.pattern(SharedService.EMAIL_REGEX)
        ])],

        createdby: [],
        createddatetime: [],
        updatedby: [this._authservice.loggedinuserid],
        updateddatetime: [new Date()],

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

  ionViewWillEnter() {


    this.submitForm.patchValue({
      id: this.xdata.tdetailsid, trainerfee: this.xdata.trainerfee, level: this.xdata.level,
    });

    this.submitForm.patchValue({ 'trainuser': { 'id': this.xdata.id } });
    this.submitForm.patchValue({ 'trainuser': { 'firstname': this.xdata.firstname } });
    this.submitForm.patchValue({ 'trainuser': { 'username': this.xdata.username } });

    this.submitForm.patchValue({ 'trainuser': { 'corporate': this.xdata.corporate } });
    this.submitForm.patchValue({ 'trainuser': { 'status': this.xdata.status } });
    this.submitForm.patchValue({ 'trainuser': { 'profileimgurl': this.xdata.profileimgurl } });
    this.submitForm.patchValue({ 'trainuser': { 'socialid': this.xdata.socialid } });
    this.submitForm.patchValue({ 'trainuser': { 'gender': this.xdata.gender } });
    this.submitForm.patchValue({ 'trainuser': { 'dob': this.xdata.dob } });

    this.submitForm.patchValue({ 'trainuser': { 'mobilenumber': this.xdata.mobilenumber } });
    this.submitForm.patchValue({ 'trainuser': { 'email': this.xdata.email } });
    this.submitForm.patchValue({ 'trainuser': { 'createdby': this.xdata.createdby } });
    this.submitForm.patchValue({ 'trainuser': { 'createddatetime': this.xdata.createddatetime } });


    this.levels.forEach(element => {
      if (this.xdata.level === element.level) {
        this.listLevelsItems.push({ level: element.level, selected: true });
        this.chosenLevel = element.level;
      } else {
        this.listLevelsItems.push({ level: element.level, selected: false });
      }
    });

    this.genders.forEach(element => {
      if (this.xdata.gender === element.gender) {
        this.listGenderItems.push({ gender: element.gender, selected: true });
        this.chosenGender = element.gender;
      } else {
        this.listGenderItems.push({ gender: element.gender, selected: false });
      }
    });

    this.imgurl = this.xdata.profileimgurl;
    
    this._cdr.markForCheck();
  }

  onItemClick(item) {

    this.listLevelsItems.forEach(e => {
      e.selected = false;
    });

    if (item.selected) {
      item.selected = false;
    } else {
      item.selected = true;
    }
    this.chosenLevel = item.level;
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

    this.submitForm.patchValue({ 'level': this.chosenLevel });
    this.submitForm.patchValue({ 'trainuser': { 'gender': this.chosenGender } });

    this.submitForm.patchValue({ 'trainuser': { 'username': this.submitForm.value.trainuser.mobilenumber } });

    // debugger;

    this.unsubscribe$.sink = this._setupapiservuce.editTrainer(this.submitForm.value).subscribe(data => {

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




  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;


    //   this.filesizeAlert = '';
    const reader = new FileReader();
    //   this.selectedFile = 'Choose a File...';

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      // console.log('file size ' + file.size);

      const FileSize = file.size / 1024 / 1024; // in MB

      // if (FileSize > 2) {
      //   this.filesizeAlert = 'Image size exceeds 2MB, consider lesser file size';
      //   return false;
      // }
      this.submitForm.patchValue({ 'trainuser': { 'filename': file.name } });


      this._cdr.markForCheck();
    }

  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log('object crop image' + this.croppedImage);

    this.submitForm.patchValue({ 'trainuser': { 'file': this.croppedImage } });
    console.log(event);
    this._cdr.markForCheck();
  }
  imageLoaded() {
    this.showCropper = true;
    this.submitForm.patchValue({ 'trainuser': { 'file': this.croppedImage } });
    this._cdr.markForCheck();
    console.log('Image loaded')
  }
  cropperReady() {
    console.log('Cropper ready')
  }
  loadImageFailed() {
    console.log('Load failed');
  }
  rotateLeft() {
    this.imageCropper.rotateLeft();
  }
  rotateRight() {
    this.imageCropper.rotateRight();
  }
  flipHorizontal() {
    this.imageCropper.flipHorizontal();
  }
  flipVertical() {
    this.imageCropper.flipVertical();
  }




  onFileChange(event) {
    //   this.filesizeAlert = '';
    const reader = new FileReader();
    //   this.selectedFile = 'Choose a File...';

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      // console.log('file size ' + file.size);

      const FileSize = file.size / 1024 / 1024; // in MB

      // if (FileSize > 2) {
      //   this.filesizeAlert = 'Image size exceeds 2MB, consider lesser file size';
      //   return false;
      // }

      reader.readAsDataURL(file);

      reader.onload = () => {

        console.log('object.......' + reader.result);

        // this.ptenroleForm.patchValue({
        //   file: reader.result,
        //   filename: file.name
        // });

        //   this.selectedFile = file.name;
        // need to run CD since file load runs outside of zone
        this._cdr.markForCheck();
      };
    }

  }



}
