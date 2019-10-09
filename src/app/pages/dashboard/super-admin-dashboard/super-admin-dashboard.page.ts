import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SetupApiService } from '../../setup/setup-api.service';

import { ErrorObject } from '../../../util/errorobject';
import * as myGlobals from '../../../services/globals';
import { SubSink } from 'subsink';
import { CommonApiService } from 'src/app/services/common-api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.page.html',
  styleUrls: ['./super-admin-dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperAdminDashboardPage implements OnInit {
  userid: any;


  corpcount: any;
  responsemsg: any;

  apiDataRes: any;

  private unsubscribe$ = new SubSink();

  constructor(private route: ActivatedRoute, private _loadingservice: LoadingService,
    private _authenticationservice: AuthenticationService, private _cdr: ChangeDetectorRef,
    private _commonapiservice: CommonApiService, private _errorservice: ErrorService,
    private setupapiservice: SetupApiService) {
    this.userid = this.route.snapshot.paramMap.get('userid');
    this._loadingservice.present('');

    this.unsubscribe$.sink = this.setupapiservice.getCorporatesCount('Y').subscribe(
      data => {

        this.apiDataRes = data;
        this.corpcount = this.apiDataRes.additionalInfo;
        this._loadingservice.dismiss();
        this._cdr.markForCheck();
      },
      error => {

        this._errorservice.logErrortoService(`getCorporatesCount@status='Y'`, error);
        this._loadingservice.dismiss();
        this._loadingservice.presentToastWithOptions(this._authenticationservice.errormsg, 'bottom', false, '');

        this._cdr.markForCheck();
      }
    );



  }




  ngOnInit() {
  }

}
