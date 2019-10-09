import { Component } from '@angular/core';

import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: [
    './styles/tabs.page.scss'
  ]
})
export class TabsPage {
  role: any;
  userid: any;

  constructor(public menu: MenuController, private _authervice: AuthenticationService,
    private router: Router,
  ) { }

  ionViewWillEnter() {
    this.role = this._authervice.getRole();
    this.userid = this._authervice.getUserid();
    
    this.menu.enable(true);
  }

  godashboard() {
    
    this.router.navigateByUrl(`/app/super-admin-dashboard/1`);
  }

}
