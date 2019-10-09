import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MemberDashboardPage } from './member-dashboard.page';
import { SharedModule } from 'src/app/shared.module';
import { MdTab1Page } from './md-tab1/md-tab1.page';
import { MdTab2Page } from './md-tab2/md-tab2.page';
import { MdTab3Page } from './md-tab3/md-tab3.page';
import { MdTab4Page } from './md-tab4/md-tab4.page';



const routes: Routes = [
  {
    path: '',
    component: MemberDashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MemberDashboardPage, MdTab1Page, MdTab2Page, MdTab3Page, MdTab4Page]
})
export class MemberDashboardPageModule { }
