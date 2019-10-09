import { Component, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormGroup, Validators, FormControl, NG_VALIDATORS } from '@angular/forms';
import { Subscription } from 'rxjs';


export interface NameFormValues {

  name: string;
}

@Component({
  selector: 'app-name-form',
  templateUrl: './name-form.component.html',
  styleUrls: ['./name-form.component.scss'],
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
export class NameFormComponent implements ControlValueAccessor, OnDestroy {
  form: FormGroup;
  subscriptions: Subscription[] = [];


  validation_messages = {

    'name': [
      { type: 'required', message: 'Name is required.' },


    ]

  };

  get value(): NameFormValues {
    return this.form.value;
  }

  set value(value: NameFormValues) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get nameControl() {
    return this.form.controls.name;
  }



  constructor(private formBuilder: FormBuilder) {



    this.form = this.formBuilder.group({

      name: ['', Validators.compose([
        Validators.required,
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
