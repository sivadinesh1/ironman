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
import { NavController, PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';

@Component({

  selector: 'app-add-servicecategory',
  templateUrl: './add-servicecategory.page.html',
  styleUrls: ['./add-servicecategory.page.scss', '../../setup.page.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddServiceCategoryPage implements OnInit {

  submitForm: FormGroup;
  apiresponse: any;

  private unsubscribe$ = new SubSink();

  subcatlist: any;
  listItems = [];
  linkedsubcatkeys = [];

  name = ['Membership', 'Group Classes', 'Personal Training'];

  framework: any;

  validation_messages = {

    'name': [{ type: 'required', message: 'Name is required.' }],
    'description': [{ type: 'required', message: 'Description is required.' }],

  };

  constructor(private _fb: FormBuilder, private _setupapiservuce: SetupApiService,
    private _navController: NavController,
    private _authervice: AuthenticationService, private _errorservice: ErrorService,
    private _route: ActivatedRoute, private _cdr: ChangeDetectorRef, private _loadingservice: LoadingService,
    private _pickerCtrl: PickerController,
    private _authservice: AuthenticationService) {


  }





  ionViewWillEnter() {

    this.unsubscribe$.sink = this._setupapiservuce.getAllServiceSubCategories('Y', this._authervice.center.id).subscribe(
      data => {

        this.apiresponse = data;
        this.subcatlist = this.apiresponse.obj;

        this.subcatlist.forEach(element => {
          this.listItems.push({ id: element.id, name: element.name, selected: false });
        });

        this._cdr.markForCheck();

      });
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
      mode: "ios",
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


  changeSelected($event, item): void {
    item.selected = $event.selected;
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

    //  let formvalue = this.submitForm.value;
    this.submitForm.patchValue({ selectedsubcatids: this.linkedsubcatkeys.toString() });

    this.unsubscribe$.sink = this._setupapiservuce.addServicecategory(this.submitForm.value).subscribe(data => {

      this.apiresponse = data;

      if (this.apiresponse.body.message === 'FAILURE') {

        this._loadingservice.presentToastWithOptions(this._authervice.errormsg, 'middle', false, '');


        this._cdr.markForCheck();
      } else if (this.apiresponse.body.message === 'SUCCESS') {
        this.submitForm.reset();
        this._loadingservice.routeAfter(600, `/app/settings/list-servicecategory/${this._authervice.center.id}`, 'Service Category Added Successfylly', 'middle', false, '');
      }

      this._cdr.markForCheck();

    }

    );

  }



  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }

  goBack() {
    this._navController.navigateBack([`/app/settings/list-servicecategory/${this._authervice.center.id}`]);
  }




}

