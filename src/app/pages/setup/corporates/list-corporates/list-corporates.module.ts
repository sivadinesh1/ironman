import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListCorporatesPage } from './list-corporates.page';
import { SharedModule } from 'src/app/shared.module';
import { CorporateResolverService } from './resolver-corporate.service';


const routes: Routes = [
  {
    path: '',
    component: ListCorporatesPage,
     resolve: { corporatelist: CorporateResolverService },
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
  declarations: [ListCorporatesPage]
})
export class ListCorporatesPageModule { }
