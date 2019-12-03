import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { ActivatedRoute, NavigationExtras } from '@angular/router';

import { ICenters } from '../centers';

import { SetupApiService } from '../../setup-api.service';
import { AlertController, NavController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';
import { ErrorService } from 'src/app/services/error.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ResolvedEntity } from '../../resolved-entity-model';



@Component({
  selector: 'app-list-centers',
  templateUrl: './list-centers.page.html',
  styleUrls: ['./list-centers.page.scss', '../../setup.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListCentersPage implements OnInit {

  error: any;
  listofcenters: any;
  apiresponse: any;
  apinewresponse: any;
  rowcount: number = 0;
  loggedinUserId: string;

  segment: string;

  constructor(private route: ActivatedRoute, private _navController: NavController,
    private alertController: AlertController, private _setupapiservice: SetupApiService,

    private _authservice: AuthenticationService,
    private _loadingservice: LoadingService, private _errorservice: ErrorService,
    private _cdr: ChangeDetectorRef) {

    this.segment = 'active';
  }

  ngOnInit() {
    this.preload();
  }



  async preload() {


    this._cdr.markForCheck();
  }

  ionViewWillEnter(): void {

    this.route.data.subscribe(data => {
      console.log('Data :', data);
      const resolvedEntity: ResolvedEntity = data['centerlist'];
      if (resolvedEntity.error == null) {
        this.listofcenters = resolvedEntity.entityList.obj || 0;

        this.rowcount = this.listofcenters.length || 0;
        this._cdr.markForCheck();

      } else {
        this.error = resolvedEntity.error;
      }

    });

  }


  navigate(item) {
    
    const center: ICenters = <ICenters>{
      id: item.id,
      name: item.name,
      corporate: item.corporate,
      details: {
        address: {
          line1: item.details.address.line1,
          line2: item.details.address.line2,
          city: item.details.address.city,
          pincode: item.details.address.pincode
        },
        contact: {
          phone: item.details.contact.phone,
          email: item.details.contact.email
        }
      },
      isactive: item.isactive,
      createdby: item.createdby,
      createddatetime: item.createddatetime,
      updatedby: item.updatedby,
      updateddatetime: item.updateddatetime

    };


    this._cdr.markForCheck();


    let navigationExtras: NavigationExtras = {
      state: { center }
    };


    this._navController.navigateForward(['/app/settings/edit-centers/'], navigationExtras
    );
  }


  gotoAdd() {
    this._navController.navigateForward(['/app/settings/add-centers']);
  }



  async changeCenterStatus(slidingItem, item, status) {
    let msg = '';
    if (status == 'Y') {
      msg = 'Will activate centers and its operations. Do you want to continue.';
    } else if (status == 'N') {
      msg = 'Will inactivate centers and its operations. Do you want to continue.'
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
            this._setupapiservice.updateEntityStatus('center', item.id, status, this._authservice.loggedinuserid, new Date()).subscribe(
              data => {
                this.apiresponse = data;

                slidingItem.close(); // <-- this is the important bit!
                this._loadingservice.presentToastWithOptions('Center Successfully deleted !!', 'bottom', false, '');
                this.listCenters('Y');
                if (status == 'Y') {
                  this.segment = 'active'
                } else {
                  this.segment = 'inactive'
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

  godash() {
    this._navController.navigateBack([`/app/dashboard/corporate-dashboard/${this._authservice.loggedinuserid}`]);
  }

  listCenters(status: string) {


    this.segment = (status === 'N' ? 'inactive' : 'active');

    this._setupapiservice.getAllCenters(status, this._authservice.corporate.id).subscribe(data1 => {
      this.apinewresponse = data1;
      console.log('object>>>> ' + JSON.stringify(this.apinewresponse));

      this.listofcenters = this.apinewresponse.obj || 0;
      this.rowcount = this.listofcenters.length || 0;



      this._cdr.markForCheck();
      this._cdr.detectChanges();

    });
  }

}

