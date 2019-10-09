import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'app-about-trainer',
  templateUrl: './about-trainer.component.html',
  styleUrls: ['./about-trainer.component.scss'],
})
export class AboutTrainerComponent implements OnInit {


  trainerInfo: any;

  constructor(private _bottomSheetRef: MatBottomSheetRef<AboutTrainerComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) { }

  ngOnInit() {
    this.trainerInfo = this.data;
    

  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
