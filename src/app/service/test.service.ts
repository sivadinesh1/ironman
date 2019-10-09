import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { testApiUrl } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  testApiUrl = testApiUrl;
  constructor(private _httpclient: HttpClient) { }

  getFakeTest() {
    return this._httpclient.get(`testApiUrl`);
  }

  

  postError(submitForm: any) {
    return this._httpclient.post(`${this.testApiUrl}/api/add-survey-question`, submitForm);
  }

}
