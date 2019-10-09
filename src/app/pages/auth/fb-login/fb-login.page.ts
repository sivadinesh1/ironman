import { Component } from '@angular/core';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController, AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-fb-login',
  templateUrl: './fb-login.page.html',
  styleUrls: ['./fb-login.page.scss'],
})
export class FbLoginPage {

  FB_APP_ID: number = 1247426718752734;

  constructor(
    private fb: Facebook,
    private nativeStorage: NativeStorage,
    public loadingController: LoadingController,
    private router: Router,
    private platform: Platform,
    public alertController: AlertController
  ) { }

  async doFbLogin() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);
    
    //the permissions your facebook app needs from the user
    const permissions = ["public_profile", "email"];
    //const permissions = ["default", "email"];

    this.fb.login(permissions)
      .then(response => {
        console.log('fb USERID response > ' + JSON.stringify(response));
        let userId = response.authResponse.userID;
        console.log('fb USERID > ' + userId);
        //Getting name and email properties
        //Learn more about permissions in https://developers.facebook.com/docs/facebook-login/permissions

        this.fb.api("/me?fields=name,email", permissions)
          .then(user => {
            user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
            //now we have the users info, let's save it in the NativeStorage
            this.nativeStorage.setItem('facebook_user',
              {
                name: user.name,
                email: user.email,
                picture: user.picture
              })
              .then(() => {
                this.router.navigate([`/dummy/${user.name}/${user.email}`]);
                loading.dismiss();
              }, error => {
                console.log(error);
                loading.dismiss();
              })
          }, error => {
            console.log('new block >> ' + error);
            loading.dismiss();
          })
      }, error => {
        console.log('fb error > ' + error);
        console.log('fb error >>> ' + JSON.stringify(error));
        if (!this.platform.is('cordova')) {
          this.presentAlert();
        }
        loading.dismiss();
      });
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