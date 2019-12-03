import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-currency-pad',
  templateUrl: './currency-pad.component.html',
  styleUrls: ['./currency-pad.component.scss'],
})
export class CurrencyPadComponent implements OnInit {

  @ViewChild('p1', { static: true }) p1;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<CurrencyPadComponent>,
  ) { }

  ngOnInit() { }

  scratchbox(number) {
    let x = this.p1.nativeElement.value;
    if (number === '-1') {
      this.p1.nativeElement.value = x.substring(0, x.length - 1);
    } else {
      this.p1.nativeElement.value = x + number;
    }



  }

  cancel() {
    this.dialogRef.close();
  }

  set() {
    this.dialogRef.close(this.p1.nativeElement.value);
  }

}

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}