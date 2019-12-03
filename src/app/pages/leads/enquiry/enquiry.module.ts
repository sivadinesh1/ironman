import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EnquiryPage } from './enquiry.page';
import { EnquiryResolverService } from './resolver-enquiry.service';

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
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EnquiryPage]
})
export class EnquiryPageModule { }
