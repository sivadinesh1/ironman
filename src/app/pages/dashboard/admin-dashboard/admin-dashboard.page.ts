import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { SubSink } from 'subsink';

import { CommonApiService } from 'src/app/services/common-api.service';
import { Route, ActivatedRoute } from '@angular/router';
import { ErrorObject } from 'src/app/util/errorobject';
import * as myGlobals from '../../../services/globals';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardPage implements OnInit, OnDestroy {
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

}
