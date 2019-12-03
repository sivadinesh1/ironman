
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ResolvedEntity } from '../../resolved-entity-model';
import { Route, ActivatedRoute, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-list-ca',
  templateUrl: './list-ca.page.html',
  styleUrls: ['./list-ca.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListCaPage implements OnInit {
  listofca: any;
  rowcount: number;
  // error: any;

  constructor(private _route: ActivatedRoute, private _cdr: ChangeDetectorRef, private _navController: NavController) { }

  ngOnInit() {
  }

  ionViewWillEnter(): void {

    this._route.data.subscribe(data => {
      const resolvedEntity: ResolvedEntity = data['calist'];
      if (resolvedEntity.error == null) {
        this.listofca = resolvedEntity.entityList.obj || 0;
        this.rowcount = this.listofca.length || 0;
        this._cdr.markForCheck();
      } else {
        //  this.error = resolvedEntity.error;
      }

    });


  }


  godash() {
    this._navController.navigateBack([`/app/settings`]);
  }

  addMc() {
    this._navController.navigateForward(['/app/settings/add-ca']);
  }

  navigate(item) {
    let navigationExtras: NavigationExtras = {
      state: { ca: item }
    };

    this._navController.navigateForward(['/app/settings/edit-ca/'], navigationExtras);
  }

}
