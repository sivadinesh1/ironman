import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { LoadingController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {

  qrData = 'https://google.com';
  scannedCode = null;
  elementType: 'url' | 'canvas' | 'img' = 'canvas';

  constructor(private barcodeScanner: BarcodeScanner, private base64ToGallery: Base64ToGallery,
    private _loadingService: LoadingService) { }

  ngOnInit() {
  }

  scanCode() {
    this.barcodeScanner.scan().then(
      barcodeData => {
        this.scannedCode = barcodeData;
      }
    )
  }

  downloadQR() {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    const imageData = canvas.toDataURL('image/jpeg').toString();
    console.log('.............' + imageData);

    let data = imageData.split(',')[1];
    this.base64ToGallery.base64ToGallery(data,
      {prefix: '_img', mediaScanner: true})
      .then(res => {
        this._loadingService.presentToast('QR Code saved into your Photo Gallery');
      }, )
  }

}
