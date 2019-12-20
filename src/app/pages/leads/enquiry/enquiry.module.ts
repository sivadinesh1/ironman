import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EnquiryPage } from './enquiry.page';
import { EnquiryResolverService } from './resolver-enquiry.service';
import { SharedModule } from 'src/app/shared.module';
import { MatDialogRef } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: EnquiryPage,
    resolve: { enquirypreload: EnquiryResolverService },
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EnquiryPage]

})
export class EnquiryPageModule { }
