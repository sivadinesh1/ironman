
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { map, catchError } from 'rxjs/operators';

import { of, Observable, forkJoin } from 'rxjs';


import { AuthenticationService } from 'src/app/services/authentication.service';
import { SetupApiService } from '../../setup/setup-api.service';
import { ResolvedEntity } from '../../setup/resolved-entity-model';


@Injectable({
    providedIn: 'root',
})
export class EnquiryResolverService implements Resolve<any> {

    constructor(private setupapiservice: SetupApiService, private _authservice: AuthenticationService) {

    }

    // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    //     // return this.setupapiservice.getAllServices('Y', this._authservice.center.id)
    //     //     .pipe(
    //     //         map((data) => new ResolvedEntity(data)),
    //     //         catchError((err: any) => of(new ResolvedEntity(null, err)))
    //     //     );

    // }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {






        let servicecategory = this.setupapiservice.getAllServiceCategories('Y', this._authservice.center.id)
            .pipe(
                map((data) => new ResolvedEntity(data)),
                catchError((err: any) => of(new ResolvedEntity(null, err)))
            );

        let services2 = this.setupapiservice.getAllServices('Y', this._authservice.center.id)
            .pipe(
                map((data) => new ResolvedEntity(data)),
                catchError((err: any) => of(new ResolvedEntity(null, err)))
            );

        return forkJoin([servicecategory, services2]);

    }


}


// resolve(route: ActivatedRouteSnapshot): Observable<any> {
//     return forkJoin([
//             this._elementsService.getElementTypes(),
//             this._elementsService.getDepartments()
//             .catch(error => {

//                 /* if(error.status === 404) {
//                     this.router.navigate(['subscription-create']);
//                 } */

//                 return Observable.throw(error);
//             })
//     ]).map(result => {
//         return {
//             types: result[0],
//             departments: result[1]
//         };
//     });
// };