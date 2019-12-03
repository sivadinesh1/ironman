import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { CaResolverService } from './resolver-ca.service';
import { ListCaPage } from './list-ca.page';



const routes: Routes = [
  {
    path: '',
    component: ListCaPage,
    resolve: { calist: CaResolverService },
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListCaPage]
})
export class ListCaPageModule { }
