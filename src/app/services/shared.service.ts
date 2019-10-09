import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CountryPhone } from '../util/validators/country-phone.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

    public static countries = [
      new CountryPhone('IN', 'India'),
      new CountryPhone('US', 'United States'),

    ];

  public static   EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  public static   EMAIL_REGEX_1 = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
  public static PINCODE_REGEX = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/;
  public static PHONE_REGEX = /^[6-9]\d{9}$/;
  public static GENDER = ['Male', 'Female'];

  // tslint:disable-next-line:max-line-length
  public static LEAD_SOURCE_LIST = ['Corporate', 'e-mail', 'Flyers/Banners', 'Frields', 'Referral', 'Hoardings', 'Passing By', 'Phone', 'SMS', 'Social Media',
  'Walk In', 'Website'];

  public static SERVICE_LIST = ['Body Building', 'Strength', 'Cardio', 'Pilates'];

  //public static ENQUIRY_TRIAL_LIST = ['No Trial', 'Trial Appointment', 'Trial Class'];

  public static ENQUIRY_TRIAL_LIST = [{'key': 'N', 'value': 'No Trial'}, {'key': 'Y', 'value': 'Trial Appointment'}];

  constructor() {}




}
