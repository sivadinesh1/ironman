import { Component, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormGroup, Validators, FormControl, NG_VALIDATORS } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

export interface AddressFormValues {
  line1: string;
  line2: string;
  state: string;
  pincode: string;
}

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AddressFormComponent),
      multi: true,
    }
  ]
})
export class AddressFormComponent implements ControlValueAccessor, OnDestroy {
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
    'city': [
      { type: 'required', message: 'City is required.' },
    ],
    'pincode': [
      { type: 'required', message: 'Pincode is required.' },
      { type: 'pattern', message: 'Enter a valid pincode.' }

    ]

  };

  get value(): AddressFormValues {
    return this.form.value;
  }

  set value(value: AddressFormValues) {
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

  get stateControl() {
    return this.form.controls.state;
  }

  get pincodeControl() {
    return this.form.controls.pincode;
  }

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      line1: ['', Validators.required],
      line2: ['', Validators.required],
      state: ['', Validators.compose([
        Validators.required,
        Validators.pattern(SharedService.EMAIL_REGEX)
      ])],
      pincode: ['', Validators.compose([
        Validators.required,
        Validators.pattern(SharedService.PINCODE_REGEX)
      ])],

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
    return this.form.valid ? null : { Address: { valid: false, }, };
  }
}
