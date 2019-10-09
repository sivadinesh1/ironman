import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { PageNotFound } from './page-not-found.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ComponentsModule,
    FormsModule,
    RouterModule.forChild([
      {
         path: '',
         component: PageNotFound
      }
    ])
  ],
  declarations: [PageNotFound]
})
export class PageNotFoundModule {}
