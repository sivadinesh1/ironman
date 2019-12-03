import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SetupApiService } from '../../setup/setup-api.service';

import { ErrorObject } from '../../../util/errorobject';
import * as myGlobals from '../../../services/globals';
import { SubSink } from 'subsink';
import { CommonApiService } from 'src/app/services/common-api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ErrorService } from 'src/app/services/error.service';
import { NavController } from '@ionic/angular';
import { DashboardApiService } from '../dashboard-api.service';

@Component({
  selector: 'app-corporate-dashboard',
  templateUrl: './corporate-dashboard.page.html',
  styleUrls: ['./corporate-dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CorporateDashboardPage implements OnInit {
  userid: any;


  centerscount: any;
  responsemsg: any;

  apiDataRes: any;
  apiDataRes2: any;

  centerInfoList: any;

  private unsubscribe$ = new SubSink();

  constructor(private route: ActivatedRoute, private _loadingservice: LoadingService,
    private _authervice: AuthenticationService, private _cdr: ChangeDetectorRef,
    private _errorservice: ErrorService, private navController: NavController,
    private _router: Router, private _dashboardapiservice: DashboardApiService,
    private setupapiservice: SetupApiService) {
    this.userid = this.route.snapshot.paramMap.get('userid');




  }

  ionViewWillEnter() {


    this.unsubscribe$.sink = this.setupapiservice.getCentersCount('Y', this._authervice.corporate.id).subscribe(
      data => {

        this.apiDataRes = data;
        this.centerscount = this.apiDataRes.additionalinfo;
      }
    );

    this.unsubscribe$.sink = this._dashboardapiservice.getCenterWiseInfo(this.userid, 'corporate').subscribe(
      data => {
        this.apiDataRes2 = data;


        if (this.apiDataRes2.message === 'FAILURE') {
          
          this._loadingservice.presentToastWithOptions(this._authervice.errormsg, 'middle', false, '');

        } else if (this.apiDataRes2.message === 'SUCCESS') {
          this.centerInfoList = this.apiDataRes2.obj;

          
          this._cdr.markForCheck();
        }


      }
    );

  }


  ngOnInit() {
  }

  addCenter() {
    this.navController.navigateForward(['/app/settings/add-centers']);
  }


  viewProfiles(item, profiles: string) {

    if (profiles === 'members') {
      this.navController.navigateForward([`/app/settings/list-members/${item.center_id}`]);
    } else if (profiles === 'trainers') {
      this.navController.navigateForward([`/app/settings/list-trainers/${item.center_id}`]);
    } else if (profiles === 'centers') {
      this.navController.navigateForward([`/app/settings/list-centers/${item.center_id}`]);
    } else if (profiles === 'mc') {
      this.navController.navigateForward([`/app/settings/list-mc/${item.center_id}`]);
    }


  }

}
