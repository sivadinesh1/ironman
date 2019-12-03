import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../../../services/loading.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SetupApiService } from '../../setup-api.service';

import { SubSink } from 'subsink';

import { NavController } from '@ionic/angular';
import { IService } from '../service';



@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.page.html',
  styleUrls: ['./edit-service.page.scss', '../../setup.page.scss'],
})
export class EditServicePage implements OnInit {

  submitForm: FormGroup;

  apiresponse: any;

  private unsubscribe$ = new SubSink();
  xdata: IService;

  validation_messages = {

    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'description': [
      { type: 'required', message: 'Description is required.' }
    ],

  };


  subcatlist: any;

  listItems = [];

  linkedsubcatkeys = [];


  currentsubcatlist: any;

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
      isactive: this.xdata.isactive, createdby: this.xdata.createdby, createddatetime: this.xdata.createddatetime

    });

    this.unsubscribe$.sink = this._setupapiservuce.getAllServiceSubCategories('Y', this._authervice.center.id).subscribe(
      data => {



        this.currentsubcatlist = data;

        this.unsubscribe$.sink = this._setupapiservuce.getAllServiceSubCategories('Y', this._authervice.center.id).subscribe(
          data => {

            this.apiresponse = data;
            this.subcatlist = this.apiresponse.obj;

            this.subcatlist.forEach(element => {

              if (this.currentsubcatlist.some(item => item.id === element.id)) {
                this.listItems.push({ id: element.id, name: element.name, selected: true });
                this.linkedsubcatkeys.push(element.id);
              } else {
                this.listItems.push({ id: element.id, name: element.name, selected: false });
              }


            });

            console.log('object....' + this.listItems.toString);

          });



        this._cdr.markForCheck();

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
      selectedsubcatids: []

    });

    this._cdr.markForCheck();

  }

  onItemClick(item) {

    if (item.selected) {
      item.selected = false;
      this.linkedsubcatkeys = this.linkedsubcatkeys.filter(element => {
        return element !== item.id;
      });

    } else {
      item.selected = true;
      this.linkedsubcatkeys.push(item.id);
    }
  }

  doSubmit(): void {

    this.submitForm.patchValue({ selectedsubcatids: this.linkedsubcatkeys.toString() });

    this.unsubscribe$.sink = this._setupapiservuce.updateService(this.submitForm.value).subscribe(
      data => {
        this.apiresponse = data;

        if (this.apiresponse.body.message === 'SUCCESS') {
          this._loadingservice.routeAfter(600, `/app/settings/list-service/${this._authervice.center.id}`, 'Service  details Updation Successful', 'bottom', false, '');
        }
      }

    );

  }

  goDash() {
    this._navController.navigateBack([`/app/settings/list-service/${this._authervice.center.id}`]);
  }

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }

  gotoListSS() {
    if (!this.submitForm.pristine || this.submitForm.touched) {
      this._loadingservice.confirmLeaving('/app/settings/list-service', this.submitForm);
    } else {
      this._router.navigate(['/app/settings/list-service']);
    }
  }

}
