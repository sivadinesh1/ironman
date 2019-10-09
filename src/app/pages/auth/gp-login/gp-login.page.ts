import { Component } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-gp-login',
  templateUrl: './gp-login.page.html',
  styleUrls: ['./gp-login.page.scss'],
})
export class GpLoginPage {

  constructor(
    private googlePlus: GooglePlus,
    private nativeStorage: NativeStorage,
    public loadingController: LoadingController,
    private router: Router,
    private platform: Platform,
    public alertController: AlertController
  ) { }

  async doGoogleLogin(){
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);
    this.googlePlus.login({
      'scopes': '', // optional - space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': '300264139568-uad3evuu4l2muin7bshjfhjbqpvuf9mc.apps.googleusercontent.com', // optional - clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true, // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
      })
      .then(async user => {
 
        const alert = await this.alertController.create({
          header: 'Alert 2',
          subHeader: 'Subtitle',
          message: 'This is an alert message.',
          buttons: ['OK']
        });
    
        await alert.present();

        //save user data on the native storage
        this.nativeStorage.setItem('google_user', {
          name: user.displayName,
          email: user.email,
          picture: user.imageUrl
        })
        .then(() => {
          this.router.navigate([`/dummy/${user.name}/${user.email}`]);
        }, (error) => {
          console.log(error);
        })
        loading.dismiss();
      }, err => {
        console.log('what error ? ' + err);
        console.log('what error ? ' + err.message);
        if(!this.platform.is('cordova')){
          this.presentAlert();
        }
        loading.dismiss();
      })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
       message: 'Cordova is not available on desktop. Please try this in a real device or in an emulator.',
       buttons: ['OK']
     });

    await alert.present();
  }


  async presentLoading(loading) {
    return await loading.present();
  }

}