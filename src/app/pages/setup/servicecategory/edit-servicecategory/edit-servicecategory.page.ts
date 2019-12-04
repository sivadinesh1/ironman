import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../../../services/loading.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SetupApiService } from '../../setup-api.service';

import { SubSink } from 'subsink';

import { NavController, PickerController } from '@ionic/angular';
import { ServiceCategory } from '../servicecategory';
import { PickerOptions } from '@ionic/core';


@Component({
  selector: 'app-edit-servicecategory',
  templateUrl: './edit-servicecategory.page.html',
  styleUrls: ['./edit-servicecategory.page.scss', '../../setup.page.scss'],
})
export class EditServiceCategoryPage implements OnInit {

  submitForm: FormGroup;

  apiresponse: any;

  private unsubscribe$ = new SubSink();
  xdata: ServiceCategory;

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
  framework: any;

  currentsubcatlist: any;

  constructor(private _fb: FormBuilder, private _setupapiservuce: SetupApiService,
    private _navController: NavController, private _router: Router,
    private _authervice: AuthenticationService, private _pickerCtrl: PickerController,
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

    this.framework = this.xdata.name;

    this.unsubscribe$.sink = this._setupapiservuce.getServiceSubCategory(this.xdata.id).subscribe(
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

  async  onClick() {


    let opts: PickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Done'
        }

      ],
      columns: [
        {
          name: 'Name',
          options: [
            { text: 'Membership', value: 'Membership' },
            { text: 'Personal Training', value: 'Personal Training' },
            { text: 'Group Classes', value: 'Group Classes' },
          ]
        }
      ],
      mode: "md",
    }



    const picker = await this._pickerCtrl.create(opts);
    await picker.present();
    picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('Name');
      console.log('object', col);
      this.framework = col.options[col.selectedIndex].text;
      this.submitForm.value.name = col.options[col.selectedIndex].value;

      this.submitForm.patchValue({ 'name': col.options[col.selectedIndex].value });

      this._cdr.markForCheck();
    });
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

    this.unsubscribe$.sink = this._setupapiservuce.updateServiceCategory(this.submitForm.value).subscribe(
      data => {
        this.apiresponse = data;

        if (this.apiresponse.body.message === 'SUCCESS') {
          this._loadingservice.routeAfter(600, `/app/settings/list-servicecategory/${this._authervice.center.id}`, 'Service Category details Updation Successful', 'bottom', false, '');
        }
      }

    );

  }

  goDash() {
    this._navController.navigateBack([`/app/settings/list-servicecategory/${this._authervice.center.id}`]);
  }

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }

  gotoListSSCategory() {
    if (!this.submitForm.pristine || this.submitForm.touched) {
      this._loadingservice.confirmLeaving('/app/settings/list-servicecategory', this.submitForm);
    } else {
      this._router.navigate(['/app/settings/list-servicecategory']);
    }
  }

}
