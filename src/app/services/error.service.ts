import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorObject } from '../util/errorobject';
import * as myGlobals from '../services/globals';
import { SubSink } from 'subsink';
import { CommonApiService } from './common-api.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements OnInit, OnDestroy {

  appErrorObj: any;
  errorObj: any;

  centerid: any;
  userid: any;

  private unsubscribe$ = new SubSink();

  constructor(private _http: HttpClient,
    private _authenticationservice: AuthenticationService,
    private _commonapiservice: CommonApiService) { }

  ngOnInit() {

    this.unsubscribe$.sink = this._authenticationservice.userdata.subscribe(user => {
      console.log('log: in app component ', user);

      
      if (user) {
        console.log('object test >> ' + JSON.stringify(user));

        this.centerid = user.center ? null : user.center;
        this.userid = user.id ? null : user.id;
      }
    });
  }

  logErrortoService(params, err) {

    this.errorObj = new ErrorObject(myGlobals.appid, this.centerid, this.userid, params, err, this._authenticationservice.device);

    this.unsubscribe$.sink = this._commonapiservice.captureError(this.errorObj).subscribe(
      data => {
        console.log('object' + JSON.stringify(data));
      }
    );

  }


  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }



}



