import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { ActivatedRoute, NavigationExtras } from '@angular/router';

import { SetupApiService } from '../../setup-api.service';
import { AlertController, NavController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';
import { ErrorService } from 'src/app/services/error.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ResolvedEntity } from '../../resolved-entity-model';
import { IService,  } from '../service';


@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.page.html',
  styleUrls: ['./list-service.page.scss'],
})
export class ListServicePage implements OnInit {

  listofservices: IService[];
  
  listofservicecategories: any;

  segment: string;
  rowcount: any;
  apiresponse: any;

  constructor(private route: ActivatedRoute, private _navController: NavController,
    private alertController: AlertController, private _setupapiservice: SetupApiService,

    private _authservice: AuthenticationService,
    private _loadingservice: LoadingService,
    private _cdr: ChangeDetectorRef) {

    this.segment = 'active';

  }

  ngOnInit() {
  }

  ionViewWillEnter(): void {

    this.route.data.subscribe(data => {
      console.log('Data :', data);
      const resolvedEntity: ResolvedEntity = data['servicelist'];
      if (resolvedEntity.error == null) {
        this.listofservices = resolvedEntity.entityList.obj || 0;

        this.rowcount = this.listofservices.length || 0;
        this._cdr.markForCheck();

      }

    });



  }

  godash() {
    this._navController.navigateBack([`/app/settings`]);
  }

  async changeServiceStatus(slidingItem, item, status) {
    let msg = '';
    if (status == 'Y') {
      msg = 'Will activate Service  and its operations. Do you want to continue.';
    } else if (status == 'N') {
      msg = 'Will inactivate Service  and its operations. Do you want to continue.'
    }

    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            slidingItem.close();
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this._setupapiservice.updateEntityStatus('service', item.id, status,
              this._authservice.loggedinuserid, new Date()).subscribe(data => {

                slidingItem.close(); // <-- this is the important bit!

              //  this.listServiceCategories('Y');
                this.listServices('Y');

                if (status == 'Y') {
                  this.segment = 'active'
                  this._loadingservice.presentToastWithOptions(' Service  Reactivated !!', 'bottom', false, '');
                } else {
                  this.segment = 'inactive'
                  this._loadingservice.presentToastWithOptions(' Service  Inactivated !!', 'bottom', false, '');
                }

                this._cdr.markForCheck();
              }

              );

          }
        }
      ]
    });

    await alert.present();
  }



  navigate(item) {

    let navigationExtras: NavigationExtras = {
      state: { item }
    };

    
    this._navController.navigateForward(['/app/settings/edit-service/'], navigationExtras
    );
  }

  listServices(status: string) {


    this.segment = (status === 'N' ? 'inactive' : 'active');

    this._setupapiservice.getAllServices(status, this._authservice.center.id).subscribe(ssdata => {
      this.apiresponse = ssdata;

debugger
      this.listofservices = this.apiresponse.obj || 0;
      this.rowcount = this.listofservices.length || 0;
      
      this._cdr.markForCheck();
      this._cdr.detectChanges();

    });
  }

  listServiceCategories(status: string) {


    this.segment = (status === 'N' ? 'inactive' : 'active');

    this._setupapiservice.getAllServiceCategories(status, this._authservice.center.id).subscribe(ssdata => {
      this.apiresponse = ssdata;


      this.listofservicecategories = this.apiresponse.obj || 0;
      this.rowcount = this.listofservicecategories.length || 0;
      
      this._cdr.markForCheck();
      this._cdr.detectChanges();

    });
  }

  gotoAdd() {
    this._navController.navigateForward([`/app/settings/add-service`]);
  }

}
