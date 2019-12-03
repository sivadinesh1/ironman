import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Pedometer, IPedometerData } from '@ionic-native/pedometer/ngx';

@Component({
  selector: 'app-pedometer',
  templateUrl: './pedometer.page.html',
  styleUrls: ['./pedometer.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PedometerPage implements OnInit {


  pedometerData: any;

  constructor(private pedometer: Pedometer, private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }


  isDistanceAvailable() {
    this.pedometer.isDistanceAvailable()
      .then((available: boolean) => console.log(available))
      .catch((error: any) => console.log(error));
  }


  startPedometerUpdates() {
    this.pedometer.startPedometerUpdates()
      .subscribe((data: IPedometerData) => {
        console.log(data);
        this.pedometerData = data;
        this._cdr.detectChanges();
        this._cdr.markForCheck();
      });

  }


}
