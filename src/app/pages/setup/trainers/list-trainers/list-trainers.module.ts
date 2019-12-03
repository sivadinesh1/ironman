import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListTrainersPage } from './list-trainers.page';
import { TrainerResolverService } from './resolver-trainer.service';

const routes: Routes = [
  {
    path: '',
    component: ListTrainersPage,
    resolve: { trainerslist: TrainerResolverService },
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
  declarations: [ListTrainersPage]
})
export class ListTrainersPageModule {}
