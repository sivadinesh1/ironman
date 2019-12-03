import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminDashboardPage } from './admin-dashboard.page';
import { AdTab1Page } from './ad-tab1/ad-tab1.page';
import { AdTab2Page } from './ad-tab2/ad-tab2.page';
import { AdTab3Page } from './ad-tab3/ad-tab3.page';
import { AdTab4Page } from './ad-tab4/ad-tab4.page';
import { AdTab1PageModule } from './ad-tab1/ad-tab1.module';
import { AdTab2PageModule } from './ad-tab2/ad-tab2.module';
import { AdTab3PageModule } from './ad-tab3/ad-tab3.module';
import { AdTab4PageModule } from './ad-tab4/ad-tab4.module';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  
    RouterModule.forChild(routes)
  ],
  declarations: [AdminDashboardPage, AdTab1Page, AdTab2Page, AdTab3Page, AdTab4Page]
  //declarations: [AdminDashboardPage]
})
export class AdminDashboardPageModule { }
