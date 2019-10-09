import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: [
    './styles/notifications.page.scss',
    './styles/notifications.shell.scss'
  ]
})
export class NotificationsPage implements OnInit {
  notifications: any;

  private unsubscribe$ = new SubSink();
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.route && this.route.data) {
      this.unsubscribe$.sink =  this.route.data.subscribe(resolvedData => {
        const dataSource = resolvedData['data'];
        if (dataSource) {
          dataSource.source.subscribe(pageData => {
            if (pageData) {
              this.notifications = pageData;
            }
          });
        }
      });
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }
}
