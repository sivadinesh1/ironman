import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListCentersPage } from './list-centers.page';
import { CenterResolverService } from './resolver-center.service';

const routes: Routes = [
  {
    path: '',
    component: ListCentersPage,
    resolve: { centerlist: CenterResolverService },
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListCentersPage]
})
export class ListCentersPageModule { }
