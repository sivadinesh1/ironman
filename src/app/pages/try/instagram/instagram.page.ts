import { Instagram } from '@ionic-native/instagram/ngx';
import { Component } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NavController } from '@ionic/angular';
 
@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.page.html',
  styleUrls: ['./instagram.page.scss'],
})
export class InstagramPage {
  currentImage = null;
 
  constructor(public navCtrl: NavController, private camera: Camera, private instagram: Instagram) { }
 
  loadImage() {
    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY      
    }
 
    this.camera.getPicture(options).then(data => {
      this.currentImage = 'data:image/jpeg;base64,' + data;
     }, err => {
      // Handle error
      console.log(err)
     });
  }
 
  shareImage() {
    this.instagram.share(this.currentImage, 'This was copied to your clipboard!')
    .then(() => {
      // Image might have been shared but you can't be 100% sure
    })
    .catch(err => {
      // Handle error
      console.error(err);      
    })
  }
 
}