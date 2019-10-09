import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserProfileModel } from './user-profile.model';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: [
    './styles/user-profile.page.scss',
    './styles/user-profile.shell.scss',
    './styles/user-profile.ios.scss',
    './styles/user-profile.md.scss'
  ],
})
export class UserProfilePage implements OnInit {
  profile: UserProfileModel;

  @HostBinding('class.is-shell') get isShell() {
    return (this.profile && this.profile.isShell) ? true : false;
  }

  private unsubscribe$ = new SubSink();
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((resolvedRouteData) => {
      const profileDataStore = resolvedRouteData['data'];

      this.unsubscribe$.sink = profileDataStore.state.subscribe(
        (state) => {
          this.profile = state;
        },
        (error) => {}
      );
    },
    (error) => {});
  }

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }


}
