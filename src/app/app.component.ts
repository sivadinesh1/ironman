import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NetworkService } from './services/network.service';
import { LoadingService } from './services/loading.service';
import { ConfigService } from './services/config.service';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

import { Inject, PLATFORM_ID } from '@angular/core';

import { SubSink } from 'subsink';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: [
    './side-menu/styles/side-menu.scss',
    './side-menu/styles/side-menu.shell.scss',
    './side-menu/styles/side-menu.responsive.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AppComponent implements OnInit {
  isConnected = true;

  appPages = [];
  accountPages = [];
  membermenu = [
    {
      title: 'Member Tutorial',
      url: '/walkthrough',
      icon: './assets/sample-icons/side-menu/tutorial.svg'
    }
  ];

  trainermenu = [
    {
      title: 'Trainer Tutorial',
      url: '/walkthrough',
      icon: './assets/sample-icons/side-menu/tutorial.svg'
    }
  ];

  adminmenu = [
    {
      title: 'Admin Tutorial',
      url: '/walkthrough',
      icon: './assets/sample-icons/side-menu/tutorial.svg'
    }
  ];

  superadminmenu = [
    {
      title: 'Corporates',
      url: '/app/list-corporates',
      icon: './assets/sample-icons/side-menu/tutorial.svg'
    }
  ];

  corporatemenu = [
    {
      title: 'Corporate Tutorial',
      url: '/walkthrough',
      icon: './assets/sample-icons/side-menu/tutorial.svg'
    }
  ];

  private unsubscribe$ = new SubSink();

  constructor(
    private platform: Platform, private _loadingservice: LoadingService,
    private splashScreen: SplashScreen, private authenticationService: AuthenticationService,
    private configService: ConfigService, private router: Router,
    private statusBar: StatusBar, private networkService: NetworkService,
    private _cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: any

  ) {
    this.initializeApp();
    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.unsubscribe$.sink = this.networkService.getNetworkStatus().subscribe((connected: boolean) => {
        this.isConnected = connected;
        console.log('network value' + connected);
        if (!connected) {
          this._loadingservice.presentToastWithOptions('Oops !!! Internet Connection Lost.', 'bottom', false, '');
          this.networkService.openNetworkSettings();
        }

      });


      this.unsubscribe$.sink = this.authenticationService.userdata.subscribe(user => {
        console.log('log: in app component ', user);
        this.appPages = [];

        if (user) {
          console.log('object test >> ' + JSON.stringify(user));
        
          let role = user.role;
          this.authenticationService.setRole(role);
          this.authenticationService.setUserid(user.id);

          if (role === 'centeradmin') {
            

            this.adminmenu.forEach(element => {
              this.appPages.push(element);
            });

            this.router.navigateByUrl(`/app/admin-dashboard/${user.id}`);

          } else if (role === 'member') {

            this.membermenu.forEach(element => {
              this.appPages.push(element);
            });

            this.router.navigateByUrl('/app/member-dashboard');
          } else if (role === 'trainer') {

            this.trainermenu.forEach(element => {
              this.appPages.push(element);
            });
            this.router.navigateByUrl('/app/trainer-dashboard');
          } else if (role === 'corporate') {

            this.corporatemenu.forEach(element => {
              this.appPages.push(element);
            });

            this.router.navigateByUrl('/app/corporate-dashboard');

          } else if (role === 'superadmin') {

            this.superadminmenu.forEach(element => {
              this.appPages.push(element);
            });
            //   this.router.navigateByUrl(`/app/super-admin-dashboard/${user.id}`);
          }

          this._cdr.markForCheck();
        }

      }

      );


    });
  }


  ngOnInit(): void {
    //  console.log(`object  + ${this.configService.getConfig().name}`);

  }

  async logout() {
    await this.authenticationService.logOut();
    this.router.navigateByUrl('');
  }

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }

}


// https://forum.ionicframework.com/t/open-native-settings-on-ionic-3-project/156998/5