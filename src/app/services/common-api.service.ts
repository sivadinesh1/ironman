import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { restApiUrl, errorApiUrl, paymentApiUrl } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { Platform } from '@ionic/angular';

import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { ErrorObject } from '../util/errorobject';
import { ResolvedRegister } from '../pages/service/register/resolved-register-model';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {
  restApiUrl = restApiUrl;

  errorApiUrl = errorApiUrl;

  errorObj: ErrorObject;
  paymentApiUrl = paymentApiUrl;

  constructor(private httpclient: HttpClient, private plt: Platform,
    @Inject(PLATFORM_ID) private platformId: any,
    private authenticationService: AuthenticationService) { }

  getRawUserDetails(username) {

    return this.httpclient.get(this.restApiUrl + '/api/getrawuserdetails/' + username);
  }

  sendOTP(mobilenumber: any) {

    return this.httpclient.post(this.restApiUrl + '/api/sendotp/', mobilenumber, { observe: 'response' });

  }

  verifyOTP(otpsessionid: any, enteredotp: any) {
    return this.httpclient.post(this.restApiUrl + '/api/verifyotp/' + otpsessionid + '/' + enteredotp, { observe: 'response' });
  }

  updateUserVerified(username) {
    return this.httpclient.get(this.restApiUrl + '/api/updateuserverified/' + username);
  }

  getActiveMemberServices(username) {
    return this.httpclient.get(`${this.restApiUrl}/api/getactivememberservices/${username}`);
  }

  // getpackages(centerid, productcategory) {
  //   return this.httpclient.get(`${this.restApiUrl}/api/getpackages/${centerid}/${productcategory}`);
  // }
  getpackages(centerid) {

    return this.httpclient.get(`${this.restApiUrl}/api/getpackages/${centerid}`);
  }

  getTrainers(centerid) {

    return this.httpclient.get(`${this.restApiUrl}/api/gettrainers/${centerid}`);
  }


  insertUserServicesSelfEnquiry(enquiryObj) {
    return this.httpclient.post<any>(this.restApiUrl + '/api/insert-user-services-self-enquiry/', enquiryObj, { observe: 'response' });
  }

  captureError(errorObj) {

    return this.httpclient.post(`${this.errorApiUrl}/api/errors/capture-error`, errorObj);

  }


  payTMgetChecksum() {
    return this.httpclient.get(this.paymentApiUrl + '/api/paytmgetchecksum');
  }

}

