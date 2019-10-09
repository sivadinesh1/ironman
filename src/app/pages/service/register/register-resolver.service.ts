
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CommonApiService } from 'src/app/services/common-api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ResolvedRegister } from './resolved-register-model';
import { map, catchError } from 'rxjs/operators';
import { Observable,  } from 'rxjs';
import { of } from 'rxjs';




@Injectable({
  providedIn: 'root',
})
export class RegisterResolverService implements Resolve<any> {


  constructor(private commonapiservice: CommonApiService, private authenticationService: AuthenticationService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {


    const service_id = route.paramMap.get('serviceid');
    const user_id = route.paramMap.get('userid');
    const center_id = route.paramMap.get('centerid');

    return this.commonapiservice.insertUserServicesSelfEnquiry({ center_id, service_id, user_id })
      .pipe(
        map((data) => new ResolvedRegister(data)),
        catchError((err:any) => of(new ResolvedRegister(null, err)))
      );

  }




}


// return this.commonapiservice
// .insertUserServicesSelfEnquiry({ center_id, service_id, user_id })
// .pipe(
//   map((data) => new ResolvedRegister(data)),
//   catchError((err: any) => Observable.of(new ResolvedRegister(null, err)))
  
// );