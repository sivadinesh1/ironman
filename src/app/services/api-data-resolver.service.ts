
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CommonApiService } from './common-api.service';
import { AuthenticationService } from './authentication.service';



@Injectable({
  providedIn: 'root',
})
export class ApiDataResolverService implements Resolve<any> {

  constructor(private commonapiservice: CommonApiService, private authenticationService: AuthenticationService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const username = route.paramMap.get('username');

    if (username != null) {
      return this.commonapiservice.getRawUserDetails(route.paramMap.get('username'));
    }

  }



}
