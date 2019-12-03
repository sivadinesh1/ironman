import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PaymentgatewayPage } from './paymentgateway.page';
import { PGAPIResolver } from 'src/app/services/pg-resolver-api.service';

const routes: Routes = [
  {
    path: '',
    component: PaymentgatewayPage,
    resolve: {userdata: PGAPIResolver},
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PaymentgatewayPage]
})
export class PaymentgatewayPageModule {}
