
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TestService } from 'src/app/service/test.service';
import { SubSink } from 'subsink';

import { CommonApiService } from 'src/app/services/common-api.service';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-dashboard',
  templateUrl: './member-dashboard.page.html',
  styleUrls: ['./member-dashboard.page.scss'],
})
export class MemberDashboardPage implements OnInit, OnDestroy {
  temp: any;
  error: any;
  userid: any;

  tab1 = false;
  tab2 = true;
  tab3 = false;
  tab4 = false;

  private unsubscribe$ = new SubSink();

  constructor(private _testService: TestService, private route: ActivatedRoute,
    private commonApiService: CommonApiService) {
    this.userid = this.route.snapshot.paramMap.get('userid');
  }

  ngOnInit() {

    this.unsubscribe$.sink = this._testService.getFakeTest().subscribe(data => {
      this.temp = data;
    },
      error => {
        this.error = error;

      }
    );

    this.unsubscribe$.sink = this.commonApiService.getActiveMemberServices(this.userid).subscribe(data => {
      this.temp = data;
      console.log('...............' + JSON.stringify(this.temp));
    },
      error => {
        this.error = error;

      }
    );


  }

  show(choice) {
    if (choice === 'tab1') {
      this.tab1 = true;
      this.tab2 = false;
      this.tab3 = false;
      this.tab4 = false;
    } else if (choice === 'tab2') {
      this.tab1 = false;
      this.tab2 = true;
      this.tab3 = false;
      this.tab4 = false;
    } else if (choice === 'tab3') {
      this.tab1 = false;
      this.tab2 = false;
      this.tab3 = true;
      this.tab4 = false;
    } else if (choice === 'tab4') {
      this.tab1 = false;
      this.tab2 = false;
      this.tab3 = false;
      this.tab4 = true;
    }


  }

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }

}
