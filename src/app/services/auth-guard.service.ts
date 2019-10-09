import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { AlertController } from '@ionic/angular';
import { take, map } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private alertctrl: AlertController,
    private loadingService: LoadingService,
    private auth: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot) {

    const expectedRole = route.data.role;

    return this.auth.userdata.pipe(
      take(1),
      map(user => {
        console.log('log: ', user);

        if (user) {
          console.log('object test >> ' + JSON.stringify(user));
          

          // access roles both ways
          let role = user['role'];
          //let role = user.role;
          if (expectedRole == role) {
            return true;
          } else {

            this.loadingService.showAlert();
            return this.router.parseUrl('/auth/login');
          }

        } else {
          this.loadingService.showAlert();
          return this.router.parseUrl('/auth/login');
        }

      })
    )



  }



  // async showAlert() {
  //   let alert = await this.alertctrl.create({
  //     header: 'Unauthorized',
  //     message: 'You are not authorized to visit this page!',
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }

}
