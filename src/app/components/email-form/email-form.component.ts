import { Component, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormGroup, Validators, FormControl, NG_VALIDATORS } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

export interface EmailFormValues {
  
  email: number;
}

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmailFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EmailFormComponent),
      multi: true,
    }
  ]
})
export class EmailFormComponent implements ControlValueAccessor, OnDestroy {
  form: FormGroup;
  subscriptions: Subscription[] = [];

  validation_messages = {

    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid Email.' }

    ]

  };

  get value(): EmailFormValues {
    return this.form.value;
  }

  set value(value: EmailFormValues) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get emailControl() {
    return this.form.controls.email;
  }



  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern(SharedService.EMAIL_REGEX)
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
