import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { restApiUrl } from 'src/environments/environment';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService {
  restApiUrl = restApiUrl;

  constructor(private httpclient: HttpClient) { }


  // corporates
  getCenterWiseInfo(userid: string, role: string) {
    return this.httpclient.get(`${this.restApiUrl}/api/getcenterwiseinfo/${userid}/${role}`);
  }


}


