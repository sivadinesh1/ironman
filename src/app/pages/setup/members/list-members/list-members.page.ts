import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ResolvedEntity } from '../../resolved-entity-model';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-members',
  templateUrl: './list-members.page.html',
  styleUrls: ['./list-members.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListMembersPage implements OnInit {
  listofmembers: any;
  rowcount: number;
  error: any;

  constructor(private _route: ActivatedRoute, private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ionViewWillEnter(): void {

    this._route.data.subscribe(data => {
      const resolvedEntity: ResolvedEntity = data['memberslist'];
      if (resolvedEntity.error == null) {
        this.listofmembers = resolvedEntity.entityList.obj || 0;
        this.rowcount = this.listofmembers.length || 0;
        this._cdr.markForCheck();
      } else {
        this.error = resolvedEntity.error;
      }

    });


  }

  godash() {

  }

  gotoAdd() {

  }

  navigate(item) {

  }

}
