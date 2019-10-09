import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { restApiUrl } from 'src/environments/environment';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SetupApiService {
  restApiUrl = restApiUrl;

  constructor(private httpclient: HttpClient) { }

  getAllCorporates(status: any) {
    return this.httpclient.get(`${this.restApiUrl}/api/getallcorporates/${status}`);
  }

  addCorporate(submitform: any) {
    return this.httpclient.post<any>(this.restApiUrl + '/api/add-corporate', submitform, { observe: 'response' });
  }

  updateCorporate(submitform: any) {
    return this.httpclient.post<any>(this.restApiUrl + '/api/update-corporate', submitform, { observe: 'response' });
  }

  getCorporatesCount(status: any) {
    return this.httpclient.get(`${this.restApiUrl}/api/getcorporatescount/${status}`);
  }



}


