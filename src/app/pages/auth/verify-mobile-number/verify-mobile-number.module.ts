import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VerifyMobileNumberPage } from './verify-mobile-number.page';
import { ApiDataResolverService } from 'src/app/services/api-data-resolver.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';


const routes: Routes = [
  {
    path: '',

    component: VerifyMobileNumberPage,
    resolve: { rawuserdata: ApiDataResolverService }
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VerifyMobileNumberPage]
})
export class VerifyMobileNumberPageModule { }
