import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CorporateDashboardPage } from './corporate-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: CorporateDashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CorporateDashboardPage]
})
export class CorporateDashboardPageModule {}
