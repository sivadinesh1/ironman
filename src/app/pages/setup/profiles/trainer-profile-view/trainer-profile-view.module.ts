import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TrainerProfileViewPage } from './trainer-profile-view.page';

const routes: Routes = [
  {
    path: '',
    component: TrainerProfileViewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TrainerProfileViewPage]
})
export class TrainerProfileViewPageModule {}
