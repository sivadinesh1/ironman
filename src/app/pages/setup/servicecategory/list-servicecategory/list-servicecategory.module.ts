import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListServiceCategoryPage } from './list-servicecategory.page';
import { ServiceCategoryResolverService } from './resolver-servicecategory.service';

const routes: Routes = [
  {
    path: '',
    component: ListServiceCategoryPage,
    resolve: { servicecategorylist: ServiceCategoryResolverService },
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
  declarations: [ListServiceCategoryPage]
})
export class ListServiceCategoryPageModule { }
