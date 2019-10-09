import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TrainerDashboardPage } from './trainer-dashboard.page';
import { TdTab1Page } from './td-tab1/td-tab1.page';

const routes: Routes = [
  {
    path: '',
    component: TrainerDashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TrainerDashboardPage, TdTab1Page]
})
export class TrainerDashboardPageModule { }
