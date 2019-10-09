import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';


import { SignupPage } from './signup.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TermsOfServicePage } from 'src/app/commons/terms-of-service/terms-of-service.page';
import { PrivacyPolicyPage } from 'src/app/commons/privacy-policy/privacy-policy.page';


const routes: Routes = [
  {
    path: '',
    component: SignupPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [SignupPage, TermsOfServicePage, PrivacyPolicyPage],
  entryComponents: [TermsOfServicePage, PrivacyPolicyPage]
})
export class SignupPageModule {}
