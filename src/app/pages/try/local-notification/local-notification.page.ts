import { Component } from '@angular/core';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-local-notification',
  templateUrl: './local-notification.page.html',
  styleUrls: ['./local-notification.page.scss'],
})
export class LocalNotificationPage {

  constructor(private localNotifications: LocalNotifications) {

  }

  registerNotification(seconds: number) {
    this.localNotifications.schedule({
      title: `my ${seconds} notification`,
      text: `my detailed description`,
      trigger: {
        // at: new Date(new Date().getTime() + ms) DOESN'T WORK
        in: seconds,
        unit: ELocalNotificationTriggerUnit.SECOND,
      },
    });
  }
}  