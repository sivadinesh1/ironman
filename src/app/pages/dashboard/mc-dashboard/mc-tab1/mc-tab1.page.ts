import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SubSink } from 'subsink';
import { CommonApiService } from 'src/app/services/common-api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ErrorService } from 'src/app/services/error.service';
import { NavController } from '@ionic/angular';
import { DashboardApiService } from '../../dashboard-api.service';
import { SetupApiService } from 'src/app/pages/setup/setup-api.service';


@Component({
  selector: 'app-mc-tab1',
  templateUrl: './mc-tab1.page.html',
  styleUrls: ['./mc-tab1.page.scss'],
})
export class McTab1Page implements OnInit {

  private unsubscribe$ = new SubSink();
  apiDataRes: any;
  userid: any;
  centerInfoList: any;

  constructor(private route: ActivatedRoute, private _loadingservice: LoadingService,
    private _authervice: AuthenticationService, private _cdr: ChangeDetectorRef,
    private _errorservice: ErrorService, private navController: NavController,
    private _router: Router, private _dashboardapiservice: DashboardApiService,
    private setupapiservice: SetupApiService) {
    this.userid = this.route.snapshot.paramMap.get('userid');




  }


  ngOnInit() {


    this.unsubscribe$.sink = this._dashboardapiservice.getCenterWiseInfo(this.userid, 'center').subscribe(
      data => {
        this.apiDataRes = data;


        if (this.apiDataRes.message === 'FAILURE') {

          this._loadingservice.presentToastWithOptions(this._authervice.errormsg, 'middle', false, '');

        } else if (this.apiDataRes.message === 'SUCCESS') {
          this.centerInfoList = this.apiDataRes.obj;

          this._cdr.markForCheck();
        }


      }
    );

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
    } else if (profiles === 'ca') {
      this.navController.navigateForward([`/app/settings/list-ca/${item.center_id}`]);
    }


  }

}
