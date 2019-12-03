import { Component, forwardRef, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormGroup, Validators, FormControl, NG_VALIDATORS } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

export interface NameFormValues {

  name: string;
}

@Component({
  selector: 'app-name-form',
  templateUrl: './name-form.component.html',
  styleUrls: ['./name-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NameFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NameFormComponent),
      multi: true,
    }
  ]
})
export class NameFormComponent implements ControlValueAccessor, OnInit, OnDestroy {
  nameForm: FormGroup;
  subscriptions: Subscription[] = [];

  validation_messages = {

    'name': [
      { type: 'required', message: 'Name is required.' },


    ]

  };

  get value(): NameFormValues {
    return this.nameForm.value;
  }

  set value(value: NameFormValues) {
    this.nameForm.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get nameControl() {
    return this.nameForm.controls.name1;
  }



  constructor(private formBuilder: FormBuilder, private _cdr: ChangeDetectorRef, ) {
    this.nameForm = this.formBuilder.group({

      name1: ['', Validators.compose([
        Validators.required,

      ])]

    });

    this.subscriptions.push(
      this.nameForm.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
        this._cdr.markForCheck();
      })
    );

  }

  ngAfterViewInit() {

  }

  ngOnInit() {

  }



  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this._cdr.markForCheck();
  }

  onChange: any = () => {
    this._cdr.markForCheck();
  };
  onTouched: any = () => {
    this._cdr.markForCheck();
  };

  registerOnChange(fn) {
    this.onChange = fn;
    this._cdr.markForCheck();
  }

  writeValue(value) {
    if (value) {
      this.value = value;
      this._cdr.markForCheck();
    }
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
    this._cdr.markForCheck();
  }

  validate(_: FormControl) {
    return this.nameForm.valid ? null : { name1: { valid: false, }, };
  }
}
