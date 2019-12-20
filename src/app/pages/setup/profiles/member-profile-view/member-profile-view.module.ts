import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MemberProfileViewPage } from './member-profile-view.page';

const routes: Routes = [
  {
    path: '',
    component: MemberProfileViewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MemberProfileViewPage]
})
export class MemberProfileViewPageModule {}
