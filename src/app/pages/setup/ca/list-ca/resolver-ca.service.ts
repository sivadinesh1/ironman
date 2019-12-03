
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { map, catchError } from 'rxjs/operators';

import { of } from 'rxjs';
import { SetupApiService } from '../../setup-api.service';
import { ResolvedEntity } from '../../resolved-entity-model';




@Injectable({
    providedIn: 'root',
})
export class CaResolverService implements Resolve<any> {

    constructor(private setupapiservice: SetupApiService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const center_id = route.paramMap.get('centerid');

        return this.setupapiservice.getAllProfiles(center_id, '6', 'Y')
            .pipe(
                map((data) => new ResolvedEntity(data)),
                catchError((err: any) => of(new ResolvedEntity(null, err)))
            );

    }




}
