import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../../../services/loading.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SetupApiService } from '../../setup-api.service';

import { SubSink } from 'subsink';

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

  private unsubscribe$ = new SubSink();
  submitForm: FormGroup;
  apiresponse: any;
  xdata: any;


  selCategory: any;
  selSubCategory: any;

  servicecategoryList;

  selSession: any;
  selValidity: any;
  selGracePeriod: any;
  selTax: any;

  base_nettotal: any;

  subcatlist: any;

  linkedsubcatkeys = [];

  optionsServiceCategoryList = [];
  optionsServiceSubCategoryList = [];

  sessions = [];
  validity = [];

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
    private _authervice: AuthenticationService, public dialog: MatDialog,
    private _pickerctrl: PickerController,
    private _route: ActivatedRoute, private _cdr: ChangeDetectorRef, private _loadingservice: LoadingService,

    private _authservice: AuthenticationService) {

    // values loaded & passed frm list page, {navigation - extra - state} 
    this.unsubscribe$.sink = this._route.queryParams.subscribe(params => {
      if (this._router.getCurrentNavigation().extras.state) {
        this.xdata = this._router.getCurrentNavigation().extras.state.item;
      }
    });

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

  ionViewWillEnter() {

    // init form values
    this.submitForm.patchValue({
      id: this.xdata.id, name: this.xdata.name, description: this.xdata.description,
      isactive: this.xdata.isactive,
      base_grossfee: this.xdata.base_grossfee,
      sessions: this.xdata.sessions,
      validity: this.xdata.validity,
      base_tax: this.xdata.base_tax,
      base_nettotal: this.xdata.base_nettotal,
      grace_period: this.xdata.graceperiod,

      selectedcatid: this.xdata.servicecategory.id,
      selectedsubcatid: this.xdata.servicesubcategory.id

    });

    // set onload select values
    this.selCategory = this.xdata.servicecategory.name;
    this.selSubCategory = this.xdata.servicesubcategory.name;
    this.selSession = this.xdata.sessions;
    this.selValidity = this.xdata.validity;
    // this.base_grossfee = this.xdata.base_grossfee;
    this.base_nettotal = this.xdata.base_nettotal;
    this.selTax = this.xdata.base_tax;
    this.selGracePeriod = this.xdata.graceperiod;


    // init picker values
    // transforms category -> options[text, value] to picker
    this.unsubscribe$.sink = this._setupapiservuce.getAllServiceCategories('Y', this._authervice.center.id).subscribe(
      data => {

        const servicecategoryList: any = data;

        servicecategoryList.obj.forEach(element => {
          this.optionsServiceCategoryList.push({ text: element.name, value: element.id })
          this._cdr.markForCheck();
        });


      });

    // BKM - initialize session with 200 values to show in picker  
    this.sessions = new Array(200).fill(null).map((x, i) => ({ 'text': i, 'value': i }))
    this.validity = new Array(365).fill(null).map((x, i) => ({ 'text': i, 'value': i }))

    this.unsubscribe$.sink = this._setupapiservuce.getServiceSubCatByCat(this._authervice.center.id, this.xdata.servicecategory.id).subscribe(
      data => {
        this.subcatlist = data;

        this.subcatlist.obj.forEach(element => {
          this.optionsServiceSubCategoryList.push({ text: element.service_sub_category, value: element.service_sub_category_id })
        });

        this._cdr.markForCheck();

      });

  }

  async sessionsPicker() {
    let opts: PickerOptions = {
      buttons: [{ text: 'Cancel', role: 'cancel', }, { text: 'Set' }],
      columns: [{ name: 'sessions', options: this.sessions }]
    };

    let picker = await this._pickerctrl.create(opts);
    // BKM - bug fix Ion-Picker options overlap
    picker.columns[0].options.forEach(element => {
      delete element.selected;
      delete element.duration;
      delete element.transform;
    });
    picker.present();
    const t = picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('sessions');

      this.selSession = col.options[col.selectedIndex].value;
      this.submitForm.patchValue({ sessions: this.selSession });

      this._cdr.markForCheck();


    })


  }

  // Currency Pad Comp
  openCurrencyPad() {
    const dialogRef = this.dialog.open(CurrencyPadComponent, { width: '90%' });

    dialogRef.afterClosed().subscribe(
      data => {
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


      this.selValidity = col.options[col.selectedIndex].value;
      this.submitForm.patchValue({ validity: this.selValidity });

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

      this.selGracePeriod = col.options[col.selectedIndex].value;
      this.submitForm.patchValue({ grace_period: this.selGracePeriod });

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

      this.selTax = col.options[col.selectedIndex].value;

      this.submitForm.patchValue({ base_tax: this.selTax });
      this._cdr.markForCheck();


    })
  }

  gotoListSS() {
    if (!this.submitForm.pristine || this.submitForm.touched) {
      this._loadingservice.confirmLeaving('/app/settings/list-service', this.submitForm);
    } else {
      this._router.navigate(['/app/settings/list-service']);
    }
  }

  Clicked() {
    this._router.navigate(['/card-animate']);
  }

  async categoryPicker() {
    let opts: PickerOptions = {
      buttons: [{ text: 'Cancel', role: 'cancel' }, { text: 'Set' }],
      columns: [{ name: 'category', options: this.optionsServiceCategoryList }]
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

      this.selCategory = col.options[col.selectedIndex].text;
      const selCategoryId = col.options[col.selectedIndex].value;
      this.submitForm.patchValue({ selectedcatid: selCategoryId });

      // fetch service sub category depending on service cat id
      this.unsubscribe$.sink = this._setupapiservuce.getServiceSubCatByCat(this._authervice.center.id, selCategoryId).subscribe(
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
      buttons: [{ text: 'Cancel', role: 'cancel' }, { text: 'Set' }],
      columns: [{ name: 'subcategory', options: this.optionsServiceSubCategoryList }]
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
      this.selSubCategory = col.options[col.selectedIndex].text;
      const selSubCategoryId = col.options[col.selectedIndex].value;

      this.submitForm.patchValue({ selectedsubcatid: selSubCategoryId });

      this._cdr.markForCheck();

    })
  }

  doSubmit(): void {

    this.unsubscribe$.sink = this._setupapiservuce.updateService(this.submitForm.value).subscribe(
      data => {
        this.apiresponse = data;

        if (this.apiresponse.body.message === 'SUCCESS') {
          this._loadingservice.routeAfter(600, `/app/settings/list-service/${this._authervice.center.id}`, 'Service  details Updation Successful', 'bottom', false, '');
        }
      }

    );

  }

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }

}