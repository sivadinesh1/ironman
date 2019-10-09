import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private appConfig: any;

  constructor(private _http: HttpClient) { }

  loadConfig() {
    // return this._http.get('https://api.myjson.com/bins/1brru7')
    //   .toPromise()
    //   .then(res => {
    //     this.appConfig = res;
    //   })
  }

  getConfig() {
    return this.appConfig;
  }
}
  