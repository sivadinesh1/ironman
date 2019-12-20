import { Component, OnInit, Inject, ViewChild, Renderer2, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-phone-pad',
  templateUrl: './phone-pad.component.html',
  styleUrls: ['./phone-pad.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhonePadComponent implements OnInit {

  @ViewChild('p1', { static: true }) p1;
  @ViewChild('cell0', { static: true }) cell0;
  @ViewChild('cell1', { static: true }) cell1;
  @ViewChild('cell2', { static: true }) cell2;
  @ViewChild('cell3', { static: true }) cell3;
  @ViewChild('cell4', { static: true }) cell4;
  @ViewChild('cell5', { static: true }) cell5;
  @ViewChild('cell6', { static: true }) cell6;
  @ViewChild('cell7', { static: true }) cell7;
  @ViewChild('cell8', { static: true }) cell8;
  @ViewChild('cell9', { static: true }) cell9;

  @ViewChild('setlabel', { static: true }) setlabel;


  constructor(private renderer: Renderer2, private _modalCtrl: ModalController,
    private _cdr: ChangeDetectorRef) { }

  ngOnInit() { }



  scratchbox(number) {

    let x = this.p1.nativeElement.innerHTML;
    // -1 is back btn
    if (number === '-1') {
      this.p1.nativeElement.innerHTML = x.substring(0, x.length - 1);

      if (this.p1.nativeElement.innerHTML.length <= 9) {
        this.renderer.removeClass(this.cell0.nativeElement, "disable-pad");
        this.renderer.removeClass(this.cell1.nativeElement, "disable-pad");
        this.renderer.removeClass(this.cell2.nativeElement, "disable-pad");
        this.renderer.removeClass(this.cell3.nativeElement, "disable-pad");
        this.renderer.removeClass(this.cell4.nativeElement, "disable-pad");
        this.renderer.removeClass(this.cell5.nativeElement, "disable-pad");
        this.renderer.removeClass(this.cell6.nativeElement, "disable-pad");
        this.renderer.removeClass(this.cell7.nativeElement, "disable-pad");
        this.renderer.removeClass(this.cell8.nativeElement, "disable-pad");
        this.renderer.removeClass(this.cell9.nativeElement, "disable-pad");

        //set btn styl
        this.renderer.removeClass(this.setlabel.nativeElement, "black-clr");
        this.renderer.addClass(this.setlabel.nativeElement, "disable-pad");

        this._cdr.markForCheck();
      }

    } else {
      const val = x.length;
      // key pad up to 10 num enable key pad color then grey out. disable handled via length check
      // no disable events
      if (x.length <= 9) {
        this.p1.nativeElement.innerHTML = x + number;

        if (x.length === 9) {
          this.renderer.addClass(this.cell0.nativeElement, "disable-pad");
          this.renderer.addClass(this.cell1.nativeElement, "disable-pad");
          this.renderer.addClass(this.cell2.nativeElement, "disable-pad");
          this.renderer.addClass(this.cell3.nativeElement, "disable-pad");
          this.renderer.addClass(this.cell4.nativeElement, "disable-pad");
          this.renderer.addClass(this.cell5.nativeElement, "disable-pad");
          this.renderer.addClass(this.cell6.nativeElement, "disable-pad");
          this.renderer.addClass(this.cell7.nativeElement, "disable-pad");
          this.renderer.addClass(this.cell8.nativeElement, "disable-pad");
          this.renderer.addClass(this.cell9.nativeElement, "disable-pad");

          this.renderer.removeClass(this.setlabel.nativeElement, "disable-pad-set");
          this.renderer.addClass(this.setlabel.nativeElement, "black-clr");

        } else {
          this.renderer.removeClass(this.cell0.nativeElement, "disable-pad");
          this.renderer.removeClass(this.cell1.nativeElement, "disable-pad");
          this.renderer.removeClass(this.cell2.nativeElement, "disable-pad");
          this.renderer.removeClass(this.cell3.nativeElement, "disable-pad");
          this.renderer.removeClass(this.cell4.nativeElement, "disable-pad");
          this.renderer.removeClass(this.cell5.nativeElement, "disable-pad");
          this.renderer.removeClass(this.cell6.nativeElement, "disable-pad");
          this.renderer.removeClass(this.cell7.nativeElement, "disable-pad");
          this.renderer.removeClass(this.cell8.nativeElement, "disable-pad");
          this.renderer.removeClass(this.cell9.nativeElement, "disable-pad");

          this.renderer.removeClass(this.setlabel.nativeElement, "black-clr");
          this.renderer.addClass(this.setlabel.nativeElement, "disable-pad");
        }
        this._cdr.markForCheck();
      }



    }

  }

  dismiss() {
    this._modalCtrl.dismiss({
      'phone': 'null'
    });
  }

  // works if num pad len is = 10
  set() {
    let x = this.p1.nativeElement.innerHTML;

    if (x.length === 10) {
      this._modalCtrl.dismiss({
        'phone': this.p1.nativeElement.innerHTML

      });
    }

  }

}

