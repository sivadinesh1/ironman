import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  roletype: any;

  constructor(private _router: Router, private _authservice: AuthenticationService) {

  }





  showDashboard() {

    let userObj = this._authservice.usrobj;
    if (userObj.role === 'centeradmin') {
      this._router.navigate([`app/dashboard/admin-dashboard/${userObj.id}`]);
    } else if (userObj.role === 'membercoordinator') {
      this._router.navigate([`app/dashboard/mc-dashboard/${userObj.id}`]);
    } else if (userObj.role === 'trainer') {
      this._router.navigate([`app/dashboard/trainer-dashboard/${userObj.id}`]);
    } else if (userObj.role === 'member') {
      this._router.navigate([`app/dashboard/member-dashboard/${userObj.id}`]);
    }

  }

}
