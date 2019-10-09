import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';

// tslint:disable-next-line:max-line-length
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSliderModule, MatSelectModule, MatRadioModule, MatSlideToggleModule, MatExpansionModule, MatDatepickerModule, MatCardModule, MatToolbarModule, MatNativeDateModule, MatTooltipModule, MatTableModule, MatMenuModule, MatPaginatorModule, MatSortModule, MatChipsModule, MatButtonToggleModule, MatSidenavModule, MatListModule, MatCheckboxModule, MatAutocompleteModule, MatProgressBarModule, MatBottomSheetModule, MatProgressSpinnerModule, MatDialogModule, MAT_DATE_LOCALE, MatSnackBarModule, MatBadgeModule, MatTabsModule } from '@angular/material';
import { IonicModule } from '@ionic/angular';


import { NullToQuotePipe } from './util/pipes/null-quote.pipe';
import { NullToZeroPipe } from './util/pipes/null-zero.pipe';
import { NullToDashPipe } from './util/pipes/null-dash.pipe';
import { NullToNaPipe } from './util/pipes/null-na.pipe';
import { CheckBooleanPipe } from './util/pipes/check-boolean.pipe';
import { SupDatePipe } from './util/pipes/sup-date.pipe';
import { CustomPipe } from './util/pipes/keys.pipe';
import { UrlidPipe } from './util/pipes/url-id.pipe';
import { SafePipe } from './util/pipes/safe-html.pipe';
import { EscapeHtmlPipe } from './util/pipes/keep-html.pipe';
import { DayWeekPipe } from './util/pipes/day-week.pipe';
import { GroupByPipe } from './util/pipes/group-by.pipe';
import { AppShellConfig } from './shell/config/app-shell.config';
import { AboutTrainerComponent } from './components/about-trainer/about-trainer.component';
import { FormDirective } from './util/directives/form.directive';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailFormComponent } from './components/email-form/email-form.component';
import { PhoneFormComponent } from './components/phone-form/phone-form.component';
import { NameFormComponent } from './components/name-form/name-form.component';


const components = [

  NullToQuotePipe,
  NullToZeroPipe,
  NullToDashPipe,
  NullToNaPipe,
  CheckBooleanPipe,
  SupDatePipe,

  CustomPipe,

  UrlidPipe,
  SafePipe,
  EscapeHtmlPipe,
  DayWeekPipe,
  GroupByPipe,

  FormDirective,
  ProfileFormComponent,
  AddressFormComponent,
  EmailFormComponent,
  PhoneFormComponent,
  NameFormComponent,
  

  AboutTrainerComponent,
];

const generic = [
  ReactiveFormsModule
]

const matcomponents = [
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSliderModule,
  MatSelectModule,
  MatRadioModule,

  MatSlideToggleModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatCardModule,
  MatNativeDateModule,

  MatToolbarModule,
  MatTooltipModule,
  MatTableModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSortModule,
  MatChipsModule,
  MatButtonToggleModule,
  MatButtonModule,

  MatSidenavModule,
  MatListModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatBottomSheetModule,
  MatDialogModule,
  MatSnackBarModule,
  MatBadgeModule,
  MatTabsModule

];

@NgModule({
  declarations: [...components,],
  imports: [
    CommonModule,
    ...matcomponents, generic, IonicModule,
  ],
  providers: [
    // Inspired in: https://devblogs.microsoft.com/premier-developer/angular-how-to-editable-config-files/
    {
      provide: APP_INITIALIZER,
      useFactory: (appShellConfig: AppShellConfig) => {
        return () => appShellConfig.load();
      },
      deps: [AppShellConfig],
      multi: true
    }
  ],
  entryComponents: [AboutTrainerComponent,],
  exports: [
    ...matcomponents, ...components, IonicModule,
  ],
})
export class SharedModule { }






// import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
// import { ExternalUrlDirective } from './util/directives/external-url.directive';
// import { ReactiveFormsModule } from '@angular/forms';

// import { IonicModule } from '@ionic/angular';

// import { NgModule, APP_INITIALIZER } from '@angular/core';
// import { CommonModule } from '@angular/common';
// // tslint:disable-next-line:max-line-length
// import { MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSliderModule, MatSelectModule, MatRadioModule, MatSlideToggleModule, MatExpansionModule, MatDatepickerModule, MatCardModule, MatToolbarModule, MatNativeDateModule, MatTooltipModule, MatTableModule, MatMenuModule, MatPaginatorModule, MatSortModule, MatChipsModule, MatButtonToggleModule, MatSidenavModule, MatListModule, MatCheckboxModule, MatAutocompleteModule, MatProgressBarModule, MatBottomSheetModule, MatProgressSpinnerModule, MatDialogModule, MAT_DATE_LOCALE, MatSnackBarModule, MatBadgeModule, MatTabsModule } from '@angular/material';

// import { NullToQuotePipe } from './util/pipes/null-quote.pipe';
// import { NullToZeroPipe } from './util/pipes/null-zero.pipe';
// import { NullToDashPipe } from './util/pipes/null-dash.pipe';
// import { NullToNaPipe } from './util/pipes/null-na.pipe';
// import { CheckBooleanPipe } from './util/pipes/check-boolean.pipe';
// import { SupDatePipe } from './util/pipes/sup-date.pipe';
// import { CustomPipe } from './util/pipes/keys.pipe';
// import { UrlidPipe } from './util/pipes/url-id.pipe';
// import { SafePipe } from './util/pipes/safe-html.pipe';
// import { EscapeHtmlPipe } from './util/pipes/keep-html.pipe';
// import { DayWeekPipe } from './util/pipes/day-week.pipe';



// import { EnrolmentInfoComponent } from './components/enrolment-info/enrolment-info.component';
// import { EnrolmentSesessionlogInfoComponent } from './components/enrolment-sesessionlog-info/enrolment-sesessionlog-info.component';
// import { TrainersPerformanceReportComponent } from './components/reports/trainers-performance-report/trainers-performance-report.component';
// import { AssessmentsSummaryReportComponent } from './components/reports/assessments-summary-report/assessments-summary-report.component';
// import { ChangeGracePeriodComponent } from './components/change-grace-period/change-grace-period.component';
// import { ChangeTrainerComponent } from './components/change-trainer/change-trainer.component';
// import { PaymentSummaryEnrolmentComponent } from './components/payment-summary-enrolment/payment-summary-enrolment.component';
// import { ChangeTrainerCommissionComponent } from './components/change-trainer-commission/change-trainer-commission.component';

// import { TerminateEnrolmentComponent } from './components/terminate-enrolment/terminate-enrolment.component';

// import { DiscountCorrectionComponent } from './components/discount-correction/discount-correction.component';
// import { PtRatingApprovalMemberComponent } from './components/pt-rating-approval-member/pt-rating-approval-member.component';
// import { TrainerPayoutDetailsComponent } from './components/trainerpayouts/trainer-payout-details/trainer-payout-details.component';
// // tslint:disable-next-line:max-line-length
// import { RunningTrainerPayoutsDetailComponent } from './components/trainerpayouts/running-trainer-payouts-detail/running-trainer-payouts-detail.component';
// // tslint:disable-next-line:max-line-length
// import { PastTrainerPayoutsDetailComponent } from './components/trainerpayouts/past-trainer-payouts-detail/past-trainer-payouts-detail.component';
// import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
// import { BalancePaymentEnrolmentComponent } from './components/balance-payment-enrolment/balance-payment-enrolment.component';
// import { GroupByPipe } from './util/pipes/group-by.pipe';
// import { InfoTabsComponent } from './components/info-tabs/info-tabs.component';
// import { EnrolmentDataComponent } from './components/enrolment-data/enrolment-data.component';
// import { EnrolmentLogDataComponent } from './components/enrolment-log-data/enrolment-log-data.component';

// import { ProfileFormComponent } from './components/profile-form/profile-form.component';
// import { PasswordFormComponent } from './components/password-form/password-form.component';
// import { ShowHidePasswordComponent } from './components/show-hide-password/show-hide-password.component';
// import { AspectRatioComponent } from './shell/aspect-ratio/aspect-ratio.component';
// import { ImageShellComponent } from './shell/image-shell/image-shell.component';
// import { TextShellComponent } from './shell/text-shell/text-shell.component';
// import { AppShellConfig } from './shell/config/app-shell.config';


// // 

// const components = [

//   NullToQuotePipe,
//   NullToZeroPipe,
//   NullToDashPipe,
//   NullToNaPipe,
//   CheckBooleanPipe,
//   SupDatePipe,


//   TrainersPerformanceReportComponent,
//   AssessmentsSummaryReportComponent,
//   TrainerPayoutDetailsComponent,
//   RunningTrainerPayoutsDetailComponent,
//   PastTrainerPayoutsDetailComponent,
//   ModalConfirmComponent,
//   BalancePaymentEnrolmentComponent,

//   ExternalUrlDirective,

//   PasswordFormComponent, ProfileFormComponent, ShowHidePasswordComponent,
//   AspectRatioComponent,
//   ImageShellComponent,
//   TextShellComponent,



//   CustomPipe,

//   UrlidPipe,
//   SafePipe,
//   EscapeHtmlPipe,
//   DayWeekPipe,
//   GroupByPipe
// ];

// const matcomponents = [
//   MatFormFieldModule,
//   MatInputModule,
//   MatIconModule,
//   MatSliderModule,
//   MatSelectModule,
//   MatRadioModule,

//   MatSlideToggleModule,
//   MatExpansionModule,
//   MatDatepickerModule,
//   MatCardModule,
//   MatNativeDateModule,

//   MatToolbarModule,
//   MatTooltipModule,
//   MatTableModule,
//   MatMenuModule,
//   MatPaginatorModule,
//   MatSortModule,
//   MatChipsModule,
//   MatButtonToggleModule,
//   MatButtonModule,

//   MatSidenavModule,
//   MatListModule,
//   MatCheckboxModule,
//   MatAutocompleteModule,
//   MatProgressBarModule,
//   MatProgressSpinnerModule,
//   MatBottomSheetModule,
//   MatDialogModule,
//   MatSnackBarModule,
//   MatBadgeModule,
//   MatTabsModule

// ];

// @NgModule({
//   declarations: [...components, EnrolmentInfoComponent,
//     EnrolmentSesessionlogInfoComponent, ChangeGracePeriodComponent, ChangeTrainerComponent,
//     PaymentSummaryEnrolmentComponent, ChangeTrainerCommissionComponent, TerminateEnrolmentComponent,
//     DiscountCorrectionComponent,
//     PtRatingApprovalMemberComponent,
//     TrainerPayoutDetailsComponent,
//     RunningTrainerPayoutsDetailComponent,
//     PastTrainerPayoutsDetailComponent,
//     ModalConfirmComponent,
//     BalancePaymentEnrolmentComponent,
//     InfoTabsComponent,
//     EnrolmentDataComponent,
//     EnrolmentLogDataComponent,



//      ],
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//    // IonicStorageModule.forRoot(),
//    NgxDaterangepickerMd.forRoot(),
//     ...matcomponents,

//     IonicModule,

//   ],
//   exports: [
//     ...matcomponents, ...components, IonicModule,
//   ],
//   providers: [
//     // Inspired in: https://devblogs.microsoft.com/premier-developer/angular-how-to-editable-config-files/
//     {
//       provide: APP_INITIALIZER,
//       useFactory: (appShellConfig: AppShellConfig) => {
//         return () => appShellConfig.load();
//       },
//       deps: [AppShellConfig],
//       multi: true
//     }
//   ],
//   entryComponents: [ EnrolmentInfoComponent,
//     EnrolmentSesessionlogInfoComponent, ChangeGracePeriodComponent, ChangeTrainerComponent,
//     PaymentSummaryEnrolmentComponent, ChangeTrainerCommissionComponent, TerminateEnrolmentComponent,
//     DiscountCorrectionComponent, PtRatingApprovalMemberComponent, TrainerPayoutDetailsComponent, 
//     RunningTrainerPayoutsDetailComponent, ModalConfirmComponent, BalancePaymentEnrolmentComponent,
//     InfoTabsComponent

//   ]
// })
// export class SharedModule { }
