import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonApiService } from 'src/app/services/common-api.service';
import { SubSink } from 'subsink';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ModalController } from '@ionic/angular';
import { AboutTrainerComponent } from 'src/app/components/about-trainer/about-trainer.component';
import { MatBottomSheet } from '@angular/material';
import { BuyPacksService } from 'src/app/services/buy-packs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-md-tab2',
  templateUrl: './md-tab2.page.html',
  styleUrls: ['./md-tab2.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class MdTab2Page implements OnInit {

  private unsubscribe$ = new SubSink();
  trainerdata: any;
  error: any;
  //center_id: any;

  trainersArr: any;

  silverTrainers: any;
  goldTrainers: any;

  silverPackageArr: any;
  goldPackageArr: any;
  packageDataArr: any;

  constructor(private commonApiService: CommonApiService, private _bottomSheet: MatBottomSheet,
    private _modalcontroller: ModalController, private cdr: ChangeDetectorRef,
    private _authservice: AuthenticationService,
    private buyPacksService: BuyPacksService, private router: Router,
    private authenticationService: AuthenticationService) { }

  async ngOnInit() {



    this.unsubscribe$.sink = this.commonApiService.getTrainers(this._authservice.center.id).subscribe(trainerdata => {
      this.trainersArr = trainerdata;
      console.log('...............' + JSON.stringify(this.trainersArr.obj));

      this.silverTrainers = this.trainersArr.obj.filter((value, index, array) => {
        return value.category === 'Silver';

      });

      this.goldTrainers = this.trainersArr.obj.filter((value, index, array) => {
        return value.category === 'Gold';

      });
      this.cdr.markForCheck();
    },
      error => {
        this.error = error;

      }
    );

    this.unsubscribe$.sink = this.commonApiService.getpackages(this._authservice.center.id).subscribe(packagedata => {
      this.packageDataArr = packagedata;
      console.log('........packageDataArr.......' + JSON.stringify(this.packageDataArr));

      this.silverPackageArr = this.packageDataArr.obj.filter((value, index, array) => {
        // if (value.service_sub_category_id === 1 && value.service_category_id === 1) {
        //   return true;
        // }

        if (value.service_category === 'Personal Training' && value.service_sub_category_name === 'Silver') {
          return true;
        }




      });


      this.goldPackageArr = this.packageDataArr.obj.filter((value, index, array) => {
        return (value.service_sub_category_id === 2 && value.service_category_id === 1);

      });

      this.buyPacksService.setSilverPacks(this.silverPackageArr);
      this.buyPacksService.setGoldPacks(this.goldPackageArr);

      this.cdr.markForCheck();
    },
      error => {
        this.error = error;

      }
    );


  }

  buyPacks(item) {

    this.router.navigate([`/buy/packs-service/${item.service_sub_category_id}/${item.service_id}/${item.sessions}`]);
  }

  async about_trainer(item) {



    const modal = await this._modalcontroller.create({
      component: AboutTrainerComponent,
      cssClass: 'modalCss',
      componentProps: {
        data: "iam roh"
      }
    });

    modal.onDidDismiss().then((result) => {
      console.log('The result:', result);
      console.log('The json result:', JSON.stringify(result));


      this.cdr.markForCheck();
    });

    return await modal.present();
  }

  openBottomSheet(item): void {
    const bottomSheetRef = this._bottomSheet.open(AboutTrainerComponent, {
      data: { item },
    });

  }

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }

}



