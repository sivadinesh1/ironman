
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ResolvedEntity } from '../../resolved-entity-model';
import { Route, ActivatedRoute, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-list-trainers',
  templateUrl: './list-trainers.page.html',
  styleUrls: ['./list-trainers.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListTrainersPage implements OnInit {
  listoftrainers: any;
  rowcount: number;
  // error: any;

  constructor(private _route: ActivatedRoute, private _cdr: ChangeDetectorRef, private _navController: NavController) { }

  ngOnInit() {
  }

  ionViewWillEnter(): void {

    this._route.data.subscribe(data => {
      const resolvedEntity: ResolvedEntity = data['trainerslist'];
      if (resolvedEntity.error == null) {
        this.listoftrainers = resolvedEntity.entityList.obj || 0;
        
        this.rowcount = this.listoftrainers.length || 0;
        this._cdr.markForCheck();
      } else {
      //  this.error = resolvedEntity.error;
      }

    });


  }

  godash() {
    this._navController.navigateBack([`/app/settings`]);
  }

  addTrainers() {
    this._navController.navigateForward(['/app/settings/add-trainers']);
  }

  navigate(item) {


    let navigationExtras: NavigationExtras = {
      state: { trainers: item }
    };


    this._navController.navigateForward(['/app/settings/edit-trainers/'], navigationExtras);
  }
}



