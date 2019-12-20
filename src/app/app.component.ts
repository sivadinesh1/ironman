import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Platform, MenuController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NetworkService } from './services/network.service';
import { LoadingService } from './services/loading.service';
import { ConfigService } from './services/config.service';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

import { Inject, PLATFORM_ID } from '@angular/core';

import { SubSink } from 'subsink';

import { OneSignal } from '@ionic-native/onesignal/ngx';


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

  mcmenu = [
    {
      title: 'MC Menu Tutorial',
      url: '/walkthrough',
      icon: './assets/sample-icons/side-menu/tutorial.svg'
    }
  ];

  superadminmenu = [
    {
      title: 'Corporates',
      url: '/app/settings/list-corporates',
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
    private _cdr: ChangeDetectorRef, public menuCtrl: MenuController,
    @Inject(PLATFORM_ID) private platformId: any,
    private oneSignal: OneSignal,
    private alertCtrl: AlertController

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
          this._loadingservice.confirm
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


            this.mcmenu.forEach(element => {
              this.appPages.push(element);
            });

            this.router.navigateByUrl(`/app/dashboard/admin-dashboard/${user.id}`);
          } else if (role === 'membercoordinator') {


            this.adminmenu.forEach(element => {
              this.appPages.push(element);
            });

            this.router.navigateByUrl(`/app/dashboard/mc-dashboard/${user.id}`);

          } else if (role === 'member') {

            this.membermenu.forEach(element => {
              this.appPages.push(element);
            });

            this.router.navigateByUrl(`/app/dashboard/member-dashboard/${user.id}`);
          } else if (role === 'trainer') {

            this.trainermenu.forEach(element => {
              this.appPages.push(element);
            });
            this.router.navigateByUrl(`/app/dashboard/trainer-dashboard/${user.id}`);
          } else if (role === 'corporate') {

            this.corporatemenu.forEach(element => {
              this.appPages.push(element);
            });

            this.router.navigateByUrl(`/app/dashboard/corporate-dashboard/${user.id}`);

          } else if (role === 'superadmin') {

            this.superadminmenu.forEach(element => {
              this.appPages.push(element);
            });
            this.router.navigateByUrl(`/app/dashboard/super-admin-dashboard/${user.id}`);
          }

          this._cdr.markForCheck();
        }

      }

      );

      if (this.platform.is('cordova')) {
        this.setupPush();
      }

    });
  }

  setupPush() {
    // I recommend to put these into your environment.ts
    this.oneSignal.startInit('a45150a4-d59b-4291-b412-ac7215e63104', '215893913121');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);

    // Notifcation was received in general
    this.oneSignal.handleNotificationReceived().subscribe(data => {
      let msg = data.payload.body;
      let title = data.payload.title;
      let additionalData = data.payload.additionalData;
      this.showAlert(title, msg, additionalData.task);
    });

    // Notification was really clicked/opened
    this.oneSignal.handleNotificationOpened().subscribe(data => {
      // Just a note that the data is a different place here!
      let additionalData = data.notification.payload.additionalData;

      this.showAlert('Notification opened', 'You already read this before', additionalData.task);
    });

    this.oneSignal.endInit();
  }

  async showAlert(title, msg, task) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: `Action: ${task}`,
          handler: () => {
            // E.g: Navigate to a specific screen
          }
        }
      ]
    })
    alert.present();
  }


  ngOnInit(): void {
    //  console.log(`object  + ${this.configService.getConfig().name}`);

  }

  toggleMenu() {
    this.menuCtrl.toggle(); //Add this method to your button click function
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