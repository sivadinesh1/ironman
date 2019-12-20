import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-bmi-calc',
  templateUrl: './bmi-calc.page.html',
  styleUrls: ['./bmi-calc.page.scss'],
})
export class BmiCalcPage implements OnInit {

  dfweight = '34';
  dfheight: number = 120;

  bmi: number;

  submitForm: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.submitForm = this._fb.group({
      height: [null, Validators.required],
      weight: [null, Validators.required],
    });
  }



  ngOnInit() {
  }

  rangeWeightChange($event) {
    this.dfweight = $event.detail.value;
  }

  rangeHeightChange($event) {
    this.dfheight = $event.detail.value;
  }

  doSubmit() {
    let weightInKilos = this.submitForm.value.weight;
    let heightInCms = this.submitForm.value.height;
    // debugger;

    let heightInMeters = (heightInCms / 100);
    this.bmi = Math.round((weightInKilos / Math.pow(heightInMeters, 2.0)) * 100) / 100.0;

  }

}
