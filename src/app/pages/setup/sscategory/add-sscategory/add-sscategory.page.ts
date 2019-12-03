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

  selector: 'app-add-sscategory',
  templateUrl: './add-sscategory.page.html',
  styleUrls: ['./add-sscategory.page.scss', '../../setup.page.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddSscategoryPage implements OnInit {
  responsemsg: any;
  submitForm: FormGroup;

  errorObj: any;
  apiresponse: any;
  loggedinUserId: any;


  private unsubscribe$ = new SubSink();


  validation_messages = {

    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'description': [
      { type: 'required', message: 'Description is required.' }
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

    this.submitForm = this._fb.group({
      name: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
      center: [this._authervice.center],

      isactive: ['Y'],
      createdby: [this._authservice.loggedinuserid],
      createddatetime: [new Date()],
      updatedby: [null],
      updateddatetime: [null],

    });

    this._cdr.markForCheck();

  }



  doSubmit(): void {

    let formvalue = this.submitForm.value;
    

    this.unsubscribe$.sink = this._setupapiservuce.addSscategory(formvalue).subscribe(data => {

      this.apiresponse = data;

      if (this.apiresponse.body.message === 'FAILURE') {

        this._loadingservice.presentToastWithOptions(this._authervice.errormsg, 'middle', false, '');


        this._cdr.markForCheck();
      } else if (this.apiresponse.body.message === 'SUCCESS') {
        this.submitForm.reset();
        this._loadingservice.routeAfter(600, `/app/settings/list-sscategory/${this._authervice.center.id}`, 'Service Sub Category Added Successfylly', 'middle', false, '');
      }

      this._cdr.markForCheck();

    }

    );

  }



  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }

  goDash() {
    this._navController.navigateBack([`/app/settings/list-sscategory/${this._authervice.center.id}`]);
  }

}

