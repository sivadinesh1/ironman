
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { map, catchError } from 'rxjs/operators';

import { of } from 'rxjs';
import { SetupApiService } from '../../setup-api.service';

import { ResolvedEntity } from '../../resolved-entity-model';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Injectable({
    providedIn: 'root',
})
export class ServiceResolverService implements Resolve<any> {

    constructor(private setupapiservice: SetupApiService, private _authservice: AuthenticationService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        return this.setupapiservice.getAllServices('Y', this._authservice.center.id)
            .pipe(
                map((data) => new ResolvedEntity(data)),
                catchError((err: any) => of(new ResolvedEntity(null, err)))
            );

    }




}
