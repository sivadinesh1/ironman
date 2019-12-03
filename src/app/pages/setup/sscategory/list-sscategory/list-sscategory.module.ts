import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListSscategoryPage } from './list-sscategory.page';
import { SscategoryResolverService } from './resolver-sscategory.service';

const routes: Routes = [
  {
    path: '',
    component: ListSscategoryPage,
    resolve: { sscategorylist: SscategoryResolverService },
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
  declarations: [ListSscategoryPage]
})
export class ListSscategoryPageModule { }
