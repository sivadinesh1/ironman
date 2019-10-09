import { Component, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormGroup, Validators, FormControl, NG_VALIDATORS } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';
import { PhoneValidator } from 'src/app/util/validators/phone.validator';
import { CountryPhone } from 'src/app/util/validators/country-phone.model';

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
  form: FormGroup;
  subscriptions: Subscription[] = [];

  countries: Array<CountryPhone>;

  validation_messages = {

    'phone': [
      { type: 'required', message: 'Phone is required.' },
      { type: 'pattern', message: 'Enter a valid Phone Number.' }

    ]

  };

  get value(): PhoneFormValues {
    return this.form.value;
  }

  set value(value: PhoneFormValues) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get phoneControl() {
    return this.form.controls.phone;
  }



  constructor(private formBuilder: FormBuilder) {
    this.countries = [
      new CountryPhone('IN', 'India'),
      new CountryPhone('US', 'United States'),

    ];

    const country = new FormControl(this.countries[0], Validators.required);




    this.form = this.formBuilder.group({

      phone: ['', Validators.compose([
        Validators.required,
        PhoneValidator.invalidCountryPhone(country)
      ])]

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
