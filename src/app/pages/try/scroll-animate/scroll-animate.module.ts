import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ScrollAnimatePage } from './scroll-animate.page';

const routes: Routes = [
  {
    path: '',
    component: ScrollAnimatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,

    RouterModule.forChild(routes)
  ],
  declarations: [ScrollAnimatePage]
})
export class ScrollAnimatePageModule { }
