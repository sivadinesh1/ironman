import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../../../services/loading.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SetupApiService } from '../../setup-api.service';

import { SubSink } from 'subsink';


import { IService } from '../service';
import { PickerOptions } from '@ionic/core';
import { NavController, PickerController } from '@ionic/angular';
import { CurrencyPadComponent } from 'src/app/components/currency-pad/currency-pad.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.page.html',
  styleUrls: ['./edit-service.page.scss', '../../setup.page.scss'],
})
export class EditServicePage implements OnInit {

  submitForm: FormGroup;

  apiresponse: any;

  private unsubscribe$ = new SubSink();
  // xdata: IService;
  xdata: any;

  category = '';
  subcategory = '';
  servicecategoryList;


  sessionVAL: any;
  validityVAL: any;
  graceperiodVAL: any;
  taxVAL: any;
  base_grossfee: any;
  base_nettotal: any;

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

  catvalue: any;

  subcatval: any;

  optionsServiceCategoryList = [];
  optionsServiceSubCategoryList = [];

  sessions = [];
  validity = [];
  action: any;

  base_tax: any;
  graceperiod: any;

  currentsubcatlist: any;

  constructor(private _fb: FormBuilder, private _setupapiservuce: SetupApiService,
    private _navController: NavController, private _router: Router,
    private _authervice: AuthenticationService, public dialog: MatDialog,
    private _pickerctrl: PickerController,
    private _route: ActivatedRoute, private _cdr: ChangeDetectorRef, private _loadingservice: LoadingService,

    private _authservice: AuthenticationService) {

    this.unsubscribe$.sink = this._route.queryParams.subscribe(params => {
      if (this._router.getCurrentNavigation().extras.state) {
        this.xdata = this._router.getCurrentNavigation().extras.state.item;
      }
    });

  }




  ionViewWillEnter() {

    debugger;

    this.submitForm.patchValue({
      id: this.xdata.id, name: this.xdata.name, description: this.xdata.description,
      isactive: this.xdata.isactive, createdby: this.xdata.createdby, createddatetime: this.xdata.createddatetime,
      base_grossfee: this.xdata.base_grossfee,
      sessions: this.xdata.sessions,
      validity: this.xdata.validity,
      base_tax: this.xdata.base_tax,
      base_nettotal: this.xdata.base_nettotal,
      grace_period: this.xdata.graceperiod,

      selectedsubcatid: this.xdata.servicecategory.id,
      selectedcatid: this.xdata.servicesubcategory.id

    });

    this.category = this.xdata.servicecategory.name;
    this.subcategory = this.xdata.servicesubcategory.name;
    this.sessionVAL = this.xdata.sessions;
    this.validityVAL = this.xdata.validity;
    this.base_grossfee = this.xdata.base_grossfee;
    this.base_nettotal = this.xdata.base_nettotal;
    this.taxVAL = this.xdata.base_tax;
    this.graceperiodVAL = this.xdata.graceperiod;




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

    this.unsubscribe$.sink = this._setupapiservuce.getServiceSubCatByCat(this._authervice.center.id, this.xdata.servicecategory.id).subscribe(
      data => {

        this.apiresponse = data;
        this.subcatlist = this.apiresponse;

        this.subcatlist.forEach(element => {
          this.optionsServiceSubCategoryList.push({ text: element.service_sub_category, value: element.service_sub_category_id })
        });

        this._cdr.markForCheck();

      });

    this._cdr.markForCheck();

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



  ngOnInit() {

    this.submitForm = this._fb.group({
      id: [null],
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


    });

    this._cdr.markForCheck();

  }

  onItemClick(item) {
    debugger;
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
    this.submitForm.patchValue({ selectedsubcatid: this.subcatval });
    this.submitForm.patchValue({ selectedcatid: this.catvalue });

    //this.submitForm.patchValue({ selectedsubcatids: this.linkedsubcatkeys.toString() });
    debugger;
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
      debugger;

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



}
