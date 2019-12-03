import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { ActivatedRoute, NavigationExtras } from '@angular/router';

import { SetupApiService } from '../../setup-api.service';
import { AlertController, NavController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';
import { ErrorService } from 'src/app/services/error.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ResolvedEntity } from '../../resolved-entity-model';
import { IServiceSubCategory, ServiceSubCategory } from '../servicesubcategory';


@Component({
  selector: 'app-list-sscategory',
  templateUrl: './list-sscategory.page.html',
  styleUrls: ['./list-sscategory.page.scss'],
})
export class ListSscategoryPage implements OnInit {

  listofsscategories: ServiceSubCategory[];

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
      const resolvedEntity: ResolvedEntity = data['sscategorylist'];
      if (resolvedEntity.error == null) {
        this.listofsscategories = resolvedEntity.entityList.obj || 0;

        this.rowcount = this.listofsscategories.length || 0;
        this._cdr.markForCheck();

      }

    });



  }

  godash() {
    this._navController.navigateBack([`/app/settings`]);
  }

  async changeSSCategoryStatus(slidingItem, item, status) {
    let msg = '';
    if (status == 'Y') {
      msg = 'Will activate Service Sub Category and its operations. Do you want to continue.';
    } else if (status == 'N') {
      msg = 'Will inactivate Service Sub Category and its operations. Do you want to continue.'
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
            this._setupapiservice.updateEntityStatus('servicesubcategory', item.id, status,
              this._authservice.loggedinuserid, new Date()).subscribe(data => {

                slidingItem.close(); // <-- this is the important bit!

                this.listSSCategories('Y');

                if (status == 'Y') {
                  this.segment = 'active'
                  this._loadingservice.presentToastWithOptions(' Service Sub Category Reactivated !!', 'bottom', false, '');
                } else {
                  this.segment = 'inactive'
                  this._loadingservice.presentToastWithOptions(' Service Sub Category Inactivated !!', 'bottom', false, '');
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

    
    this._navController.navigateForward(['/app/settings/edit-sscategory/'], navigationExtras
    );
  }

  listSSCategories(status: string) {


    this.segment = (status === 'N' ? 'inactive' : 'active');

    this._setupapiservice.getAllServiceSubCategories(status, this._authservice.center.id).subscribe(sscategorydata => {
      this.apiresponse = sscategorydata;


      this.listofsscategories = this.apiresponse.obj || 0;
      this.rowcount = this.listofsscategories.length || 0;

      this._cdr.markForCheck();
      this._cdr.detectChanges();

    });
  }

  gotoAdd() {
    this._navController.navigateForward([`/app/settings/add-sscategory`]);
  }

}
