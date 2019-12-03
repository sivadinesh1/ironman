import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TimerPage } from './timer.page';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { NavigationBar } from '@ionic-native/navigation-bar/ngx';

const routes: Routes = [
  {
    path: '',
    component: TimerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animation: false,
      responsive: true,
      renderOnClick: false
    }),
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    Insomnia,
    NavigationBar,
  ],
  declarations: [TimerPage]
})
export class TimerPageModule { }
