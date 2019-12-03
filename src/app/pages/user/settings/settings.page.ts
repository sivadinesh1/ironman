import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPage implements OnInit {
  localData: any;

  settingsArr = [];

  constructor(private _authservice: AuthenticationService, private _navController: NavController,
    private _cdr: ChangeDetectorRef
  ) {

  }



  ngOnInit() {

    this.settingsArr.push(
      { 'name': 'Members', 'url': '/app/settings/list-members/' + this._authservice.center.id },
      { 'name': 'Trainers', 'url': '/app/settings/list-trainers/' + this._authservice.center.id },
      { 'name': 'Member Coordinators', 'url': '/app/settings/list-mc/' + this._authservice.center.id },
      { 'name': 'Admins', 'url': '/app/settings/list-ca/' + this._authservice.center.id },
      { 'name': 'Service', 'url': '/app/settings/list-service/' + this._authservice.center.id },
      { 'name': 'Service Category', 'url': '/app/settings/list-servicecategory/' + this._authservice.center.id },
      { 'name': 'Service Sub Category', 'url': '/app/settings/list-sscategory/' + this._authservice.center.id }
    );
  }

  navigate(item) {
    this._navController.navigateForward([`${item.url}`]);
  }

}
