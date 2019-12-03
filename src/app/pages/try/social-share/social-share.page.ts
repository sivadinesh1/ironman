import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-social-share',
  templateUrl: './social-share.page.html',
  styleUrls: ['./social-share.page.scss'],
})
export class SocialSharePage implements OnInit {

  

  constructor(private socialsharing: SocialSharing, private file: File) { }

  ngOnInit() {
  }

  shareEmail() {
    this.socialsharing.shareViaEmail('test', 'subtest', ['sivadinesh@gmail.com'])

  }

  shareFB() {
    this.socialsharing.shareViaFacebook('test', null, 'www.google.com');
  }

  shareWhatsApp() {
    this.socialsharing.shareViaWhatsApp('test', null, 'www.google.com');
  }

}
