import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


import { ActivatedRoute } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';


import { SubSink } from 'subsink';
import { ErrorService } from 'src/app/services/error.service';
import { SharedService } from 'src/app/services/shared.service';
import { NavController, ModalController } from '@ionic/angular';
import { SetupApiService } from '../../setup/setup-api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PhoneValidator } from 'src/app/util/validators/phone.validator';
import { ResolvedEntity } from '../../setup/resolved-entity-model';
import { NavigationService } from 'src/app/services/navigation.service';
import { ServicesCardComponent } from 'src/app/components/services-card/services-card.component';

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

  listItems = [];

  validation_messages = {
    'phone': [
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

  constructor(private _fb: FormBuilder, private _setupapiservuce: SetupApiService,
    private _navController: NavController, private _navService: NavigationService,
    private _authervice: AuthenticationService, private _errorservice: ErrorService,
    private _modalcontroller: ModalController,
    private _route: ActivatedRoute, private _cdr: ChangeDetectorRef, private _loadingservice: LoadingService,

    private _authservice: AuthenticationService) {
    const country = new FormControl(SharedService.countries[0], Validators.required);

    this.submitForm = this._fb.group({

      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      center: [this._authservice.center],
      service: [null],

      istrial: [null, Validators.required],

      phone: [null, Validators.compose([
        Validators.required, PhoneValidator.invalidCountryPhone(country)
      ])],

      email: [null, Validators.compose([
        Validators.required,
        Validators.pattern(SharedService.EMAIL_REGEX)
      ])],

      isactive: ['Y'],
      createdby: [this._authservice.loggedinuserid],
      createddatetime: [new Date()],
      updatedby: [],
      updateddatetime: [null],
    });

  }

  ionViewWillEnter() {

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



    this.servicesinfo1.entityList.obj.forEach(element => {
      this.listItems.push({ id: element.id, name: element.name, selected: false });
    });


  }


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
    });

    await modal.present();



  }


  ngOnInit() {
    this._cdr.markForCheck();

  }

  showDashboard() {
    this._navService.showDashboard();
  }


  doSubmit(): void {

    let formvalue = this.submitForm.value;

    this.unsubscribe$.sink = this._setupapiservuce.addCenter(formvalue).subscribe(data => {

      this.apiresponse = data;

      if (this.apiresponse.message === 'SUCCESS') {
        this.submitForm.reset();
        this._loadingservice.routeAfter(600, `/app/settings/list-centers`, 'Center Added Successfylly', 'middle', false, '');
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



}

