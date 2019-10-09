import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';

import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading = false;

  constructor(private loadingController: LoadingController,
    private _router: Router,
    private alertctrl: AlertController,
    private toastController: ToastController) { }

  async present(msg) {
    this.isLoading = true;
    return await this.loadingController.create(
      {
        message: msg,
        cssClass: 'custom-loader-class',
        spinner: 'lines'
      },
    ).then((res) => {
      res.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          res.dismiss().then(() => console.log('abort presenting'));
        }
      });

      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');

      });

    },

    );
  }

  /**
   * simple dismiss function
   */
  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => {
      console.log('dismissed');

    });
  }

  /**
   * calls after dismissAfter method
   * @param url 
   * @param toastmsg 
   * @param pos 
   * @param isclose 
   * @param btncaption 
   */
  async dismissNRoute(url, toastmsg, pos, isclose, btncaption) {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => {
      console.log('dismissed');
      this.presentToastWithOptions(toastmsg, pos, isclose, btncaption);
      this._router.navigateByUrl(url);
    });
  }

  /**
   * 
   * @param timer - waiting time to call dismiss
   * @param url - navigation url after loading dismissed
   * @param toastmsg  - toast msg after dismissed
   * @param pos - position of toast, middle, bottom (by default)
   * @param isclose - show close button or not 
   * @param btncaption - btn caption
   */
  async dismissAfter(timer, url, toastmsg, pos, isclose, btncaption) {
    setTimeout(() => {
      this.dismissNRoute(url, toastmsg, pos, isclose, btncaption);
    }, timer);
  }


  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async presentToastWithOptions(msg, pos, isclose, btncaption) {
    const toast = await this.toastController.create({
      message: msg,
      showCloseButton: isclose,
      position: pos,
      duration: 2000,
      color: 'primary',
      closeButtonText: btncaption
    });
    toast.present();
  }

  confirm(message?: string): Observable<boolean> {
    const confirmation = window.confirm(message || 'Are you sure?');
    return of(confirmation);
  }

  async showAlert() {
    let alert = await this.alertctrl.create({
      header: 'Unauthorized',
      message: 'You are not authorized to visit this page!',
      buttons: ['OK']
    });
    alert.present();
  }

}
