import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ResolvedRegister } from './resolved-register-model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage implements OnInit {
  paramsSubscription: Subscription;
  registerenquiryData: any;
  error: any;

  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef) {
    
    const resolvedRegister: ResolvedRegister = this.route.snapshot.data['registerenquiry'];
    if (resolvedRegister.error == null) {
      this.registerenquiryData = resolvedRegister.register;
    } else {
      this.error = resolvedRegister.error;
    }

    this.cdr.markForCheck();

  }

  ngOnInit() {
  }

}
