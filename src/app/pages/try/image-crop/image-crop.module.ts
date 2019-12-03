import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ImageCropPage } from './image-crop.page';
import { ImageCropperModule } from 'ngx-image-cropper';

const routes: Routes = [
  {
    path: '',
    component: ImageCropPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ImageCropperModule
  ],
  declarations: [ImageCropPage]
})
export class ImageCropPageModule {}
