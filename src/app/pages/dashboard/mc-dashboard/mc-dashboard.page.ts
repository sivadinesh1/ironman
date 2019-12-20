import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { SubSink } from 'subsink';

import { CommonApiService } from 'src/app/services/common-api.service';
import { Route, ActivatedRoute } from '@angular/router';
import { ErrorObject } from 'src/app/util/errorobject';
import * as myGlobals from '../../../services/globals';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-mc-dashboard',
  templateUrl: './mc-dashboard.page.html',
  styleUrls: ['./mc-dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class McDashboardPage implements OnInit, OnDestroy {
  temp: any;
  error: any;
  userid: any;

  errorObj: ErrorObject;

  tab1 = false;
  tab2 = true;
  tab3 = false;
  tab4 = false;

  private unsubscribe$ = new SubSink();

  constructor( private route: ActivatedRoute,
    private _navController: NavController,
    private cdr: ChangeDetectorRef, private authenticationService: AuthenticationService,
    private commonApiService: CommonApiService) {
    this.userid = this.route.snapshot.paramMap.get('userid');

  }

  ngOnInit() {


  }

  show(choice) {
    if (choice === 'tab1') {
      this.tab1 = true;
      this.tab2 = false;
      this.tab3 = false;
      this.tab4 = false;
    } else if (choice === 'tab2') {
      this.tab1 = false;
      this.tab2 = true;
      this.tab3 = false;
      this.tab4 = false;
    } else if (choice === 'tab3') {
      this.tab1 = false;
      this.tab2 = false;
      this.tab3 = true;
      this.tab4 = false;
    } else if (choice === 'tab4') {
      this.tab1 = false;
      this.tab2 = false;
      this.tab3 = false;
      this.tab4 = true;
    }


  }

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }

  addEnquiry() {
    this._navController.navigateForward(['/add-enquiry']);
  }

  addRating() {
    this._navController.navigateForward(['/smile-rate']);
  }

  addSlider() {
    this._navController.navigateForward(['/slider-test']);
  }

  addScrollAnimate() {
    this._navController.navigateForward(['/scroll-animate']);
  }

  addScrollVanish() {
    this._navController.navigateForward(['/scroll-vanish']);
  }

  addAnimatedHeartLike() {
    this._navController.navigateForward(['/animated-heart-like']);
  }

  addAnimateList() {
    this._navController.navigateForward(['/animate-list']);
  }

  addCart() {
    this._navController.navigateForward(['/cart-home']);
  }

  addTimer() {
    this._navController.navigateForward(['/timer']);
  }

  addCalci() {
    this._navController.navigateForward(['/calci']);
  }

  addMeditation() {
    this._navController.navigateForward(['/meditate']);
  }

  addNotification() {
    this._navController.navigateForward(['/local-notification']);
  }

  addBreathe() {
    this._navController.navigateForward(['/breather']);
  }

  animatedDiv() {
    this._navController.navigateForward(['/animated-div']);
  }

  dragDrop() {
    this._navController.navigateForward(['/drag-drop']);
  }

  eventCalendar() {
    this._navController.navigateForward(['/event-calendar']);
  }

  bmiCalc() {
    this._navController.navigateForward(['/bmi-calc']);
  }

  qrCode() {
    this._navController.navigateForward(['/qr-code']);
  }

  sms() {
    this._navController.navigateForward(['/sms']);
  }


  contactMgmt() {
    this._navController.navigateForward(['/contact-mgmt']);
  }

  speechText() {
    this._navController.navigateForward(['/speech-text']);
  }

  instagram() {
    this._navController.navigateForward(['/instagram']);
  }

  pedometer() {
    this._navController.navigateForward(['/pedometer']);
  }

  socialshare() {
    this._navController.navigateForward(['/social-share']);
  }

  media() {
    this._navController.navigateForward(['/media']);
  }


  pay(id) {
    this._navController.navigateForward(`/paymentgateway/${id}`);
  }

  imageCrop() {
    this._navController.navigateForward(`/image-crop`);
  }



}

