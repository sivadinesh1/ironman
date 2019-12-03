
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { map, catchError } from 'rxjs/operators';

import { of } from 'rxjs';
import { SetupApiService } from '../../setup-api.service';
import { ResolvedEntity } from '../../resolved-entity-model';



@Injectable({
    providedIn: 'root',
})
export class CorporateResolverService implements Resolve<any> {

    constructor(private setupapiservice: SetupApiService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        return this.setupapiservice.getAllCorporates('Y')
            .pipe(
                map((data) => new ResolvedEntity(data)),
                catchError((err: any) => of(new ResolvedEntity(null, err)))
            );

    }




}
