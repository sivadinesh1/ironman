import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SuperAdminDashboardPage } from './super-admin-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: SuperAdminDashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SuperAdminDashboardPage]
})
export class SuperAdminDashboardPageModule {}
