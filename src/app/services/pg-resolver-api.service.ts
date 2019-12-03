import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


import { CommonApiService } from './common-api.service';


@Injectable({
    providedIn: 'root'
  })
export class PGAPIResolver implements Resolve<any> {

  constructor(private _commonApiService: CommonApiService, ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // this works too
    // console.log('RESOLVE >> ' + route.url[0].path);

    const inputval = route.paramMap.get('inputval');
    console.log('object >>> ' + inputval);
    // return this._commonApiService.pay(route.paramMap.get('inputval'));

    return this._commonApiService.payTMgetChecksum();


   // return this._commonApiService.pay('test');

}

}
