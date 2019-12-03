
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ResolvedEntity } from '../../resolved-entity-model';
import { Route, ActivatedRoute, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-list-mc',
  templateUrl: './list-mc.page.html',
  styleUrls: ['./list-mc.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListMcPage implements OnInit {
  listofmc: any;
  rowcount: number;
  error: any;

  constructor(private _route: ActivatedRoute, private _cdr: ChangeDetectorRef, private _navController: NavController) { }

  ngOnInit() {
  }

  ionViewWillEnter(): void {

    this._route.data.subscribe(data => {
      const resolvedEntity: ResolvedEntity = data['mclist'];
      if (resolvedEntity.error == null) {
        this.listofmc = resolvedEntity.entityList.obj || 0;
        this.rowcount = this.listofmc.length || 0;
        this._cdr.markForCheck();
      } else {
        this.error = resolvedEntity.error;
      }

    });


  }


  godash() {
    this._navController.navigateBack([`/app/settings`]);
  }

  addMc() {
    this._navController.navigateForward(['/app/settings/add-mc']);
  }

  navigate(item) {
    let navigationExtras: NavigationExtras = {
      state: { mc: item }
    };
    
    this._navController.navigateForward(['/app/settings/edit-mc/'], navigationExtras);
  }

}
