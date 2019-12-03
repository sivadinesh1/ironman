import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { McDashboardPage } from './mc-dashboard.page';
import { McTab1Page } from './mc-tab1/mc-tab1.page';
import { McTab2Page } from './mc-tab2/mc-tab2.page';
import { McTab3Page } from './mc-tab3/mc-tab3.page';
import { McTab4Page } from './mc-tab4/mc-tab4.page';

const routes: Routes = [
  {
    path: '',
    component: McDashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    
    RouterModule.forChild(routes)
  ],

  declarations: [McDashboardPage, McTab1Page, McTab2Page, McTab3Page, McTab4Page]
})
export class McDashboardPageModule { }



