
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { map, catchError } from 'rxjs/operators';

import { of } from 'rxjs';
import { SetupApiService } from '../../setup-api.service';
import { ResolvedEntity } from '../../resolved-entity-model';




@Injectable({
    providedIn: 'root',
})
export class TrainerResolverService implements Resolve<any> {

    constructor(private setupapiservice: SetupApiService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const center_id = route.paramMap.get('centerid');

        return this.setupapiservice.getAllTrainers(center_id, '4', 'Y')
            .pipe(
                map((data) => new ResolvedEntity(data)),
                catchError((err: any) => of(new ResolvedEntity(null, err)))
            );

    }




}
