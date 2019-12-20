import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';


import { SubSink } from 'subsink';
import { ErrorService } from 'src/app/services/error.service';
import { SharedService } from 'src/app/services/shared.service';
import { NavController, ModalController, PickerController, AlertController } from '@ionic/angular';
import { SetupApiService } from '../../setup/setup-api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PhoneValidator } from 'src/app/util/validators/phone.validator';
import { ResolvedEntity } from '../../setup/resolved-entity-model';
import { NavigationService } from 'src/app/services/navigation.service';
import { ServicesCardComponent } from 'src/app/components/services-card/services-card.component';
import { PickerOptions, PickerColumnOption } from '@ionic/core';
import { TrialCalenderComponent } from 'src/app/components/trial-calender/trial-calender.component';
import { PhonePadComponent } from 'src/app/components/phone-pad/phone-pad.component';
import { MatDialog, MatStepper } from '@angular/material';
import { EnquiryApiService } from './enquiry-api.service';
import * as moment from 'moment';
import { CdkStepper } from '@angular/cdk/stepper';



@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.page.html',
  styleUrls: ['./enquiry.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnquiryPage implements OnInit {
  responsemsg: any;
  submitForm: FormGroup;


  apiresponse: any;
  loggedinUserId: any;

  private unsubscribe$ = new SubSink();

  userForm: FormGroup;

  listItems = [];


  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  trialFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  projvalue: any;

  chosenpack: any;
  chosentrial: any;

  @ViewChild("stepper", { static: false }) stepper: MatStepper;

  leadsource: PickerColumnOption[] = [{ text: "Promo", value: "Promo" }, { text: "Referal", value: "Referal" },
  { text: "Walk-in", value: "Walk-in" }, { text: "Campaign", value: "Campaign" }, { text: "Others", value: "Others" }];

  gender: PickerColumnOption[] = [{ text: "Male", value: "Male" }, { text: "Female", value: "Female" }];

  selLeadSource: any;
  selGender: any;

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.submitForm.get('formArray'); }

  validation_messages = {
    'mobilenumber': [
      { type: 'required', message: 'Phone Number is required.' },
      { type: 'pattern', message: 'Enter a valid Phone Number.' },
      { type: 'invalidCountryPhone', message: 'Mobile Number seems wrong.' }
    ],
    'firstname': [
      { type: 'required', message: 'First Name is required.' }
    ],
    'lastname': [
      { type: 'required', message: 'Last Name is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'line1': [
      { type: 'required', message: 'Line 1 is required.' },
    ],
    'city': [
      { type: 'required', message: 'City is required.' },

    ],
    'pincode': [
      { type: 'required', message: 'Pincode is required.' },
      { type: 'pattern', message: 'Enter a valid pincode.' }

    ]


  };

  servicesinfo1: any;
  servicesinfo2: any;

  navigationSubscription: any;

  constructor(private _fb: FormBuilder, private _enquiryapiservice: EnquiryApiService,
    private _navController: NavController, private _navService: NavigationService,
    private _authervice: AuthenticationService, private _errorservice: ErrorService,
    private _modalcontroller: ModalController, private _pickerctrl: PickerController,
    private router: Router, public dialog: MatDialog, private _alertController: AlertController,
    private _route: ActivatedRoute, private _cdr: ChangeDetectorRef, private _loadingservice: LoadingService,

    private _authservice: AuthenticationService) {

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });

    const country = new FormControl(SharedService.countries[0], Validators.required);

    this.firstFormGroup = this._fb.group({
      firstname: ['', Validators.required],
      lastname: [''],
      gender: ['', Validators.required],
      center: [this._authservice.center],
      mobilenumber: [null, Validators.compose([
        Validators.required, PhoneValidator.invalidCountryPhone(country)
      ])],
      email: ['', Validators.email],
      isactive: ['Y'],
    });
    this.secondFormGroup = this._fb.group({
      service_id: ['', Validators.required],
    });

    this.trialFormGroup = this._fb.group({
      title: [''],
      description: [''],
      starttime: [''],
      endtime: [''],
      allday: [''],
      istrial: ['N', Validators.required],
    });

    this.fourthFormGroup = this._fb.group({
      notes: [''],
      lead_source: ['', Validators.required],
      userid: [this._authservice.loggedinuserid, Validators.required]
    });




  }

  // dnd code for same route reload
  initialiseInvites() {
    // Set default values and re-fetch any data you need.
  }

  ionViewWillEnter() {


    this.listItems = [];

    this._route.data.subscribe(data => {
      console.log('Data :', data);
      const resolvedEntity: ResolvedEntity = data['enquirypreload'];

      if (resolvedEntity.error == null) {
        this.servicesinfo1 = resolvedEntity[0];

        this.servicesinfo2 = resolvedEntity[1];


        this._cdr.markForCheck();

      } else {

      }

    });



    // this.servicesinfo1.entityList.obj.forEach(element => {
    //   this.listItems.push({
    //     id: element.id, name: element.name, description: element.description,
    //     selected: false
    //   });

    // });


    this.servicesinfo1.entityList.obj.forEach(element => {
      this.listItems.push({
        id: element.id, name: element.name, count: element.count,
        selected: false
      });

    });


  }



  // showServicesCard(item) {
  //   this.router.navigateByUrl(`/view-packages/${item.id}`);
  // }

  // DND
  async showServicesCard(item) {

    const modal = await this._modalcontroller.create({
      component: ServicesCardComponent,
      componentProps: {
        id: item.id
      },
      cssClass: 'select-modal'

    });

    modal.onDidDismiss().then((result) => {
      console.log('The result:', result);

      // direct [x] btn

      if (result.data !== undefined) {
        const retval = result.data.chosenservice;

        const undval = result.data;


        if (retval != 'null' && retval != undefined) {

          this.chosenpack = result.data.chosenservice;

          this.secondFormGroup.patchValue({ service_id: result.data.chosenservice.id });
          this._cdr.markForCheck();
        }
      }




    });

    await modal.present();

  }

  async leadSourcePicker() {
    let opts: PickerOptions = {
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Set' }
      ],
      columns: [{ name: 'leadsource', options: this.leadsource }]
    };

    let picker = await this._pickerctrl.create(opts);

    picker.columns[0].options.forEach(element => {
      delete element.selected;
      delete element.duration;
      delete element.transform;
    });
    picker.present();
    const t = picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('leadsource');

      console.log('col:' + col);

      console.log('object' + data.role);

      this.selLeadSource = col.options[col.selectedIndex].value;
      this.fourthFormGroup.patchValue({ lead_source: this.selLeadSource });

      this._cdr.markForCheck();


    })

  }

  async genderPicker() {
    let opts: PickerOptions = {
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Set' }
      ],
      columns: [{ name: 'gender', options: this.gender }]
    };

    let picker = await this._pickerctrl.create(opts);

    picker.columns[0].options.forEach(element => {
      delete element.selected;
      delete element.duration;
      delete element.transform;
    });
    picker.present();
    const t = picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('gender');

      console.log('col:' + col);

      console.log('object' + data.role);

      this.selGender = col.options[col.selectedIndex].value;
      this.firstFormGroup.patchValue({ gender: this.selGender });

      this._cdr.markForCheck();


    })

  }

  ngOnInit() {
    this.userForm = this._fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required]
    });
    this._cdr.markForCheck();

  }

  showDashboard() {
    console.log('object gone in show dashboad');
    this._navService.showDashboard();
  }


  doSubmit(): void {

    this.projvalue = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.trialFormGroup.value,
      ...this.fourthFormGroup.value
    };

    this.unsubscribe$.sink = this._enquiryapiservice.addEnquiry(this.projvalue).subscribe(data => {

      this.apiresponse = data;



      if (this.apiresponse.message === 'SUCCESS') {

        this.fourthFormGroup.reset();
        this.trialFormGroup.reset();
        this.secondFormGroup.reset();
        this.firstFormGroup.reset();

        this.stepper.reset();
        this.stepper.selectedIndex = 0;

        this.chosentrial = null;
        this.chosenpack = null;
        this.selLeadSource = null;

        this.fourthFormGroup.patchValue({ userid: this._authservice.loggedinuserid });
        this.firstFormGroup.patchValue({ center: this._authservice.center });


        this.enquiryAddedMsg();

      } else if (this.apiresponse.message === 'ERROR') {
        this._loadingservice.presentToastWithOptions(this.apiresponse.additionalinfo, 'middle', false, '');
      }


      this._cdr.markForCheck();

    });
  }



  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }

  goListCenters() {
    this._navController.navigateBack([`/app/settings/list-centers`]);
  }

  trialCalendar() {
    this._navController.navigateForward(['/trial-calendar']);
  }



  async showtrialCalendar() {

    const modal = await this._modalcontroller.create({
      component: TrialCalenderComponent,
      componentProps: {
        id: 'hi'
      },
      cssClass: 'schedule-trial-modal'

    });

    modal.onDidDismiss().then((result) => {
      console.log('The result:', result);

      this.chosentrial = result.data.trialinfo;

      if (this.chosentrial !== 'null') {

        const starttime = moment(result.data.trialinfo.starttime).format("DD-MM-YYYY HH:mm:ss");
        const endtime = moment(result.data.trialinfo.starttime).add(1, 'hours').format('DD-MM-YYYY HH:mm:ss');

        console.log('object time TEST >> ' + endtime);

        this.chosentrial.title = `Trial Class`;
        this.chosentrial.desc = `${this.firstFormGroup.value.firstname} - ${this.chosenpack.name}`;

        //const endtime = moment(starttime).add(1, 'hours').format("DD-MM-YYYY HH:mm:ss");  // see the cloning?

        this.trialFormGroup.patchValue({ title: `${this.firstFormGroup.value.firstname} Trial Class ` });
        this.trialFormGroup.patchValue({ description: `Package: ${this.chosenpack.name}` });
        this.trialFormGroup.patchValue({ starttime: starttime });
        this.trialFormGroup.patchValue({ endtime: endtime });
        this.trialFormGroup.patchValue({ allday: 'N' });
        this.trialFormGroup.patchValue({ istrial: 'Y' });

        this._cdr.detectChanges();
      } else if (this.chosentrial === 'null') {
        this.chosentrial = '';
      }

      this._cdr.markForCheck();

    });

    return await modal.present();

  }


  async openPhonePad() {

    const myModal = await this._modalcontroller.create({
      component: PhonePadComponent,
      cssClass: 'my-custom-modal-css'
    });

    myModal.onDidDismiss()
      .then((data) => {

        const user = data['data']; // Here's your selected user!
      });


    myModal.onDidDismiss().then((result) => {
      console.log('The result:', result);
      console.log('The json result:', JSON.stringify(result));


      if (result.data.phone === 'null') {
        this.firstFormGroup.patchValue({ mobilenumber: null });
      } else {
        this.firstFormGroup.patchValue({ mobilenumber: result.data.phone });
      }


      this._cdr.markForCheck();
    });

    return await myModal.present();
  }




  async enquiryAddedMsg() {

    let msg = 'Enquiry Successfully Added. Want to add another enquiry? ';

    const alert = await this._alertController.create({
      header: 'Confirm!',
      message: msg,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');

            this.showDashboard();
            this._cdr.detectChanges();
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay STAYS BACK');

            this._cdr.detectChanges();
          }
        }
      ]
    });

    await alert.present();
  }


}

