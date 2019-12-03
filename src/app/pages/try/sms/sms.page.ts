import { Component, OnInit } from '@angular/core';
import { SMS } from '@ionic-native/sms/ngx';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.page.html',
  styleUrls: ['./sms.page.scss'],
})
export class SmsPage implements OnInit {

  constructor(private sms: SMS) { }

  ngOnInit() {
  }

  sendSMS() {
    // Send a text message using default options
      this.sms.send('9585858750', 'Hello world!');
  }

}
