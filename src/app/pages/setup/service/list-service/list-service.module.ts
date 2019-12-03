import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListServicePage } from './list-service.page';
import { ServiceResolverService } from './resolver-service.service';

const routes: Routes = [
  {
    path: '',
    component: ListServicePage,
    resolve: { servicelist: ServiceResolverService },
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
  declarations: [ListServicePage]
})
export class ListServicePageModule { }
