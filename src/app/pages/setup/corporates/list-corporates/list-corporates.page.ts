import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';

import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ICorporates, Corporates } from '../corporates';
import { SetupApiService } from '../../setup-api.service';
import { AlertController, NavController } from '@ionic/angular';
import { SubSink } from 'subsink';
import { LoadingService } from 'src/app/services/loading.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ResolvedEntity } from '../../resolved-entity-model';

@Component({
  selector: 'app-list-corporates',
  templateUrl: './list-corporates.page.html',
  styleUrls: ['./list-corporates.page.scss', '../../setup.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListCorporatesPage implements OnInit {

  listofcorporates: Corporates[];
  apiresponse: any;
  apinewresponse: any;
  rowcount: number = 0;
  segment: string;

  private unsubscribe$ = new SubSink();

  constructor(private route: ActivatedRoute, private _authservice: AuthenticationService,
    private _setupapiservice: SetupApiService, private _navController: NavController,
    private _loadingservice: LoadingService,
    private alertController: AlertController,
    private _cdr: ChangeDetectorRef) {
    this.segment = 'active';
  }



  ngOnInit() {

  }


  ionViewWillEnter(): void {

    this.route.data.subscribe(data => {
      const resolvedEntity: ResolvedEntity = data['corporatelist'];
      if (resolvedEntity.error == null) {

        this.listofcorporates = resolvedEntity.entityList.obj || 0;
        this.rowcount = this.listofcorporates.length || 0;
        this._cdr.markForCheck();
      } else {
        this._loadingservice.presentToastWithOptions(this._authservice.errormsg, 'bottom', false, '');
      }

    });

  }




  navigate(item: ICorporates) {

    const corporate: ICorporates = <ICorporates>{
      id: item.id,
      name: item.name,
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
      state: { corporate }
    };


    this._navController.navigateForward(['/app/settings/edit-corporates/'], navigationExtras
    );
  }


  gotoAdd() {
    this._navController.navigateForward(['/app/settings/add-corporates']);
  }




  async changeCorporateStatus(slidingItem, item, status) {
    let msg = '';
    if (status == 'Y') {
      msg = 'Will activate corporate and its operations. Do you want to continue.';
    } else if (status == 'N') {
      msg = 'Will inactivate corporate and its operations. Do you want to continue.'
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

            this._setupapiservice.updateEntityStatus('corporate', item.id, status, this._authservice.loggedinuserid, new Date()).subscribe(
              data => {
                this.apiresponse = data;

                if (this.apiresponse.message === 'SUCCESS') {

                  slidingItem.close(); // <-- this is the important bit!
                  slidingItem.closeOpened();

                  this._loadingservice.presentToastWithOptions('Corporate Successfully deleted !!', 'bottom', false, '');

                  this.listCorporates('Y');

                  if (status == 'Y') {
                    this.segment = 'active'
                  } else {
                    this.segment = 'inactive'
                  }
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

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }

  godash() {
    this._navController.navigateBack([`/app/dashboard/super-admin-dashboard/${this._authservice.loggedinuserid}`]);
  }

  listCorporates(status: string) {


    this.segment = (status === 'N' ? 'inactive' : 'active');

    this._setupapiservice.getAllCorporates(status).subscribe(data1 => {
      this.apinewresponse = data1;
      console.log('object>>>> ' + JSON.stringify(this.apinewresponse));

      this.listofcorporates = this.apinewresponse.obj || 0;
      this.rowcount = this.listofcorporates.length || 0;



      this._cdr.markForCheck();
      this._cdr.detectChanges();

    });
  }

}


