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
import { CurrencyPadComponent } from 'src/app/components/currency-pad/currency-pad.component';
import { MatDialog } from '@angular/material';

@Component({

  selector: 'app-add-service',
  templateUrl: './add-service.page.html',
  styleUrls: ['./add-service.page.scss', '../../setup.page.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddServicePage implements OnInit {

  submitForm: FormGroup;
  apiresponse: any;

  private unsubscribe$ = new SubSink();

  servicecategoryList;

  optionsServiceCategoryList = [];
  optionsServiceSubCategoryList = [];

  sessions = [];
  validity = [];




  subcatlist: any;
  listItems = [];
  linkedsubcatkeys = [];

  category = '';
  subcategory = '';

  catvalue: any;

  subcatval: any;


  sessionVAL: any;
  validityVAL: any;
  graceperiodVAL: any;
  taxVAL: any;

  action: any;

  validation_messages = {

    'name': [{ type: 'required', message: 'Name is required.' }],
    'description': [{ type: 'required', message: 'Description is required.' }],

  };

  constructor(private _fb: FormBuilder, private _setupapiservuce: SetupApiService,
    public dialog: MatDialog,
    private _navController: NavController, private _pickerctrl: PickerController,
    private _authervice: AuthenticationService, private _errorservice: ErrorService,
    private _route: ActivatedRoute, private _cdr: ChangeDetectorRef, private _loadingservice: LoadingService,

    private _authservice: AuthenticationService) {


  }



  // { text: 'Angular', value: 'A' },

  ionViewWillEnter() {



    this.unsubscribe$.sink = this._setupapiservuce.getAllServiceCategories('Y', this._authervice.center.id).subscribe(
      data => {
        this.apiresponse = data;
        this.servicecategoryList = this.apiresponse.obj;

        this.servicecategoryList.forEach(element => {
          this.optionsServiceCategoryList.push({ text: element.name, value: element.id })
          this._cdr.markForCheck();
        });


      });

    this.sessions = new Array(200).fill(null).map((x, i) => ({ 'text': i, 'value': i }))
    this.validity = new Array(365).fill(null).map((x, i) => ({ 'text': i, 'value': i }))
  }



  ngOnInit() {

    this.submitForm = this._fb.group({
      name: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
      center: [this._authervice.center],


      selectedcatid: [],
      selectedsubcatid: [],

      sessions: [null, Validators.compose([Validators.required])],
      validity: [null, Validators.compose([Validators.required])],
      base_grossfee: [null, Validators.compose([Validators.required])],
      base_tax: [null, Validators.compose([Validators.required])],
      base_nettotal: [],
      grace_period: [null, Validators.compose([Validators.required])],

      isactive: ['Y'],
      createdby: [this._authservice.loggedinuserid],
      createddatetime: [new Date()],
      updatedby: [null],
      updateddatetime: [null],

    });

    this._cdr.markForCheck();

  }

  openDialog() {
    const dialogRef = this.dialog.open(CurrencyPadComponent, {
      width: '90%',
      data: {
        animal: 'panda'
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data);

        if (data.length > 0) {
          this.submitForm.patchValue({ base_grossfee: data });
        }

        this._cdr.markForCheck();
      }
    );
  }



  changeSelected($event, item): void {
    item.selected = $event.selected;
  }


  async categoryPicker() {
    let opts: PickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Set'
        }
      ],
      columns: [
        {
          name: 'category',
          options: this.optionsServiceCategoryList


        }
      ]
    };
    let picker = await this._pickerctrl.create(opts);

    picker.columns[0].options.forEach(element => {
      delete element.selected;
      delete element.duration;
      delete element.transform;
    });

    picker.present();
    picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('category');
      console.log('col:' + col);

      this.category = col.options[col.selectedIndex].text;
      this.catvalue = col.options[col.selectedIndex].value;

      console.log('object.....' + this.category)


      this.unsubscribe$.sink = this._setupapiservuce.getServiceSubCatByCat(this._authervice.center.id, this.catvalue).subscribe(
        data => {

          this.apiresponse = data;
          this.subcatlist = this.apiresponse;

          this.subcatlist.forEach(element => {
            this.optionsServiceSubCategoryList.push({ text: element.service_sub_category, value: element.service_sub_category_id })
          });

          this._cdr.markForCheck();

        });

      this._cdr.markForCheck();


    })
  }


  async subCategoryPicker() {
    let opts: PickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Set'
        }
      ],
      columns: [
        {
          name: 'subcategory',
          options: this.optionsServiceSubCategoryList


        }
      ]
    };
    let picker = await this._pickerctrl.create(opts);
    picker.columns[0].options.forEach(element => {
      delete element.selected;
      delete element.duration;
      delete element.transform;
    });
    picker.present();
    picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('subcategory');
      console.log('col:' + col);

      this.subcategory = col.options[col.selectedIndex].text;
      this.subcatval = col.options[col.selectedIndex].value;

      console.log('object.....' + this.subcategory)
      this._cdr.markForCheck();


    })
  }




  async sessionsPicker() {
    let opts: PickerOptions = {
      buttons: [
        {
          text: 'Cancel', role: 'cancel', handler: (value: any): void => {
            console.log(value, 'cancel');
            this.action = 'cancel';
          },
        },
        {
          text: 'Set', handler: (value: any): void => {
            console.log(value, 'set');
            this.action = 'set';
          }
        }
      ],
      columns: [{ name: 'sessions', options: this.sessions }]
    };

    let picker = await this._pickerctrl.create(opts);

    picker.columns[0].options.forEach(element => {
      delete element.selected;
      delete element.duration;
      delete element.transform;
    });
    picker.present();
    const t = picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('sessions');

      console.log('col:' + col);

      console.log('object' + data.role);

      this.sessionVAL = col.options[col.selectedIndex].value;
      this.submitForm.patchValue({ sessions: this.sessionVAL });

      this._cdr.markForCheck();


    })

    console.log('object..' + t);


  }


  async validityPicker() {
    let opts: PickerOptions = {
      buttons: [{ text: 'Cancel', role: 'cancel' }, { text: 'Set' }],
      columns: [{ name: 'validity', options: this.validity }]
    };

    let picker = await this._pickerctrl.create(opts);

    picker.columns[0].options.forEach(element => {
      delete element.selected;
      delete element.duration;
      delete element.transform;
    });
    picker.present();
    picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('validity');
      console.log('col:' + col);

      this.validityVAL = col.options[col.selectedIndex].value;
      this.submitForm.patchValue({ validity: this.validityVAL });

      this._cdr.markForCheck();


    })
  }

  async graceperiodPicker() {
    let opts: PickerOptions = {
      buttons: [{ text: 'Cancel', role: 'cancel' }, { text: 'Set' }],
      columns: [{ name: 'graceperiod', options: this.validity }]
    };

    let picker = await this._pickerctrl.create(opts);

    picker.columns[0].options.forEach(element => {
      delete element.selected;
      delete element.duration;
      delete element.transform;
    });
    picker.present();
    picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('graceperiod');
      console.log('col:' + col);

      this.graceperiodVAL = col.options[col.selectedIndex].value;
      this.submitForm.patchValue({ grace_period: this.graceperiodVAL });

      this._cdr.markForCheck();


    })
  }

  async taxPicker() {
    let opts: PickerOptions = {
      buttons: [{ text: 'Cancel', role: 'cancel' }, { text: 'Set' }],
      columns: [{ name: 'tax', options: this.validity }]
    };

    let picker = await this._pickerctrl.create(opts);

    picker.columns[0].options.forEach(element => {
      delete element.selected;
      delete element.duration;
      delete element.transform;
    });
    picker.present();
    picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('tax');
      console.log('col:' + col);

      this.taxVAL = col.options[col.selectedIndex].value;

      this.submitForm.patchValue({ base_tax: this.taxVAL });
      this._cdr.markForCheck();


    })
  }


  doSubmit(): void {


    this.submitForm.patchValue({ selectedsubcatid: this.subcatval });
    this.submitForm.patchValue({ selectedcatid: this.catvalue });





    this.unsubscribe$.sink = this._setupapiservuce.addService(this.submitForm.value).subscribe(data => {

      this.apiresponse = data;

      if (this.apiresponse.body.message === 'FAILURE') {

        this._loadingservice.presentToastWithOptions(this._authervice.errormsg, 'middle', false, '');


        this._cdr.markForCheck();
      } else if (this.apiresponse.body.message === 'SUCCESS') {
        this.submitForm.reset();
        this._loadingservice.routeAfter(600, `/app/settings/list-service/${this._authervice.center.id}`, 'Service  Added Successfylly', 'middle', false, '');
      }

      this._cdr.markForCheck();

    }

    );

  }



  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }

  goBack() {
    this._navController.navigateBack([`/app/settings/list-service/${this._authervice.center.id}`]);
  }




}

