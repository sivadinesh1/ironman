import { Component, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormGroup, Validators, FormControl, NG_VALIDATORS } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

export interface PhoneFormValues {

  phone: number;
}

@Component({
  selector: 'app-phone-form',
  templateUrl: './phone-form.component.html',
  styleUrls: ['./phone-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PhoneFormComponent),
      multi: true,
    }
  ]
})
export class PhoneFormComponent implements ControlValueAccessor, OnDestroy {
  phoneForm: FormGroup;
  subscriptions: Subscription[] = [];

  validation_messages = {

    'phone': [
      { type: 'required', message: 'Phone is required.' },
      { type: 'pattern', message: 'Enter a valid Phone.' }

    ]

  };

  get value(): PhoneFormValues {
    return this.phoneForm.value;
  }

  set value(value: PhoneFormValues) {
    this.phoneForm.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get phoneControl() {
    return this.phoneForm.controls.phone;
  }



  constructor(private formBuilder: FormBuilder) {
    this.phoneForm = this.formBuilder.group({

      phone: ['', Validators.compose([
        Validators.required,
        Validators.pattern(SharedService.PHONE_REGEX)
      ])]

    });

    this.subscriptions.push(
      this.phoneForm.valueChanges.subscribe(value => {
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
    return this.phoneForm.valid ? null : { profile: { valid: false, }, };
  }
}
