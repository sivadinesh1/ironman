import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListMcPage } from './list-mc.page';
import { McResolverService } from './resolver-mc.service';

const routes: Routes = [
  {
    path: '',
    component: ListMcPage,
    resolve: { mclist: McResolverService },
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
  declarations: [ListMcPage]
})
export class ListMcPageModule { }
