import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../../../services/loading.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SetupApiService } from '../../setup-api.service';

import { SubSink } from 'subsink';

import { NavController } from '@ionic/angular';
import { ServiceSubCategory } from '../servicesubcategory';


@Component({
  selector: 'app-edit-sscategory',
  templateUrl: './edit-sscategory.page.html',
  styleUrls: ['./edit-sscategory.page.scss', '../../setup.page.scss'],
})
export class EditSscategoryPage implements OnInit {

  submitForm: FormGroup;

  apiresponse: any;

  private unsubscribe$ = new SubSink();
  xdata: ServiceSubCategory;

  validation_messages = {

    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'description': [
      { type: 'required', message: 'Description is required.' }
    ],

  };

  constructor(private _fb: FormBuilder, private _setupapiservuce: SetupApiService,
    private _navController: NavController, private _router: Router,
    private _authervice: AuthenticationService,
    private _route: ActivatedRoute, private _cdr: ChangeDetectorRef, private _loadingservice: LoadingService,

    private _authservice: AuthenticationService) {

    this.unsubscribe$.sink = this._route.queryParams.subscribe(params => {
      if (this._router.getCurrentNavigation().extras.state) {
        this.xdata = this._router.getCurrentNavigation().extras.state.item;
      }
    });

  }


  ionViewWillEnter() {

    this.submitForm.patchValue({
      id: this.xdata.id, name: this.xdata.name, description: this.xdata.description,
      center: this.xdata.center, isactive: this.xdata.isactive, createdby: this.xdata.createdby, createddatetime: this.xdata.createddatetime

    });

  }

  ngOnInit() {

    this.submitForm = this._fb.group({
      id: [null],
      name: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
      isactive: [],
      createdby: [],
      createddatetime: [],
      updatedby: [this._authervice.loggedinuserid],
      updateddatetime: [new Date()],

      center: [],

    });

    this._cdr.markForCheck();

  }


  doSubmit(): void {
    
    this.unsubscribe$.sink = this._setupapiservuce.updateSSCategory(this.submitForm.value).subscribe(
      data => {
        this.apiresponse = data;

        if (this.apiresponse.body.message === 'SUCCESS') {
          this._loadingservice.routeAfter(600, `/app/settings/list-sscategory/${this._authervice.center.id}`, 'Service Sub Category details Updation Successful', 'bottom', false, '');
        }
      }

    );

  }

  goDash() {
    this._navController.navigateBack([`/app/settings/list-sscategory/${this._authervice.center.id}`]);
  }

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }

  gotoListSSCategory() {
    if (!this.submitForm.pristine || this.submitForm.touched) {
      this._loadingservice.confirmLeaving('/app/settings/list-sscategory', this.submitForm);
    } else {
      this._router.navigate(['/app/settings/list-sscategory']);
    }
  }

}
