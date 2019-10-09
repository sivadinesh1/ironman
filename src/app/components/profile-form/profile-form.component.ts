import { Component, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormGroup, Validators, FormControl, NG_VALIDATORS } from '@angular/forms';
import { Subscription } from 'rxjs';

export interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: number;
}

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProfileFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProfileFormComponent),
      multi: true,
    }
  ]
})
export class ProfileFormComponent implements ControlValueAccessor, OnDestroy {
  form: FormGroup;
  subscriptions: Subscription[] = [];

  validation_messages = {

    'line1': [
      { type: 'required', message: 'Line 1 is required.' },
    ],
    'line2': [
      { type: 'required', message: 'Line 2 is required.' },
    ],
    'state': [
      { type: 'required', message: 'State is required.' },

    ],
    'pincode': [
      { type: 'required', message: 'Pincode is required.' },
      { type: 'pattern', message: 'Enter a valid pincode.' }

    ]



  };

  get value(): ProfileFormValues {
    return this.form.value;
  }

  set value(value: ProfileFormValues) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get emailControl() {
    return this.form.controls.email;
  }

  get line1Control() {
    return this.form.controls.line1;
  }

  get line2Control() {
    return this.form.controls.line2;
  }

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      line1: ['', Validators.required],
      line2: ['', Validators.required]
    });

    this.subscriptions.push(
      this.form.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  registerOnChange(fn) {
    this.onChange = fn;
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  validate(_: FormControl) {
    return this.form.valid ? null : { profile: { valid: false, }, };
  }
}
