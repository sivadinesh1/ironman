import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';

// tslint:disable-next-line:max-line-length
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSliderModule, MatSelectModule, MatRadioModule, MatSlideToggleModule, MatExpansionModule, MatDatepickerModule, MatCardModule, MatToolbarModule, MatNativeDateModule, MatTooltipModule, MatTableModule, MatMenuModule, MatPaginatorModule, MatSortModule, MatChipsModule, MatButtonToggleModule, MatSidenavModule, MatListModule, MatCheckboxModule, MatAutocompleteModule, MatProgressBarModule, MatBottomSheetModule, MatProgressSpinnerModule, MatDialogModule, MAT_DATE_LOCALE, MatSnackBarModule, MatBadgeModule, MatTabsModule, MatStepperModule } from '@angular/material';
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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EmailFormComponent } from './components/email-form/email-form.component';
import { PhoneFormComponent } from './components/phone-form/phone-form.component';
import { NameFormComponent } from './components/name-form/name-form.component';
import { ScrollVanishDirective } from './directives/scroll-vanish.directive';
import { AnimateItemsDirective } from './directives/animate-items.directive';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { TrialCalenderComponent } from './components/trial-calender/trial-calender.component';
import { NgCalendarModule } from 'ionic2-calendar';
import { PhonePadComponent } from './components/phone-pad/phone-pad.component';

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
  TrialCalenderComponent,


  ScrollVanishDirective,
  AnimateItemsDirective,
];

const generic = [
  ReactiveFormsModule,
  NgCalendarModule,
  FormsModule
]

const matcomponents = [
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSliderModule,
  MatSelectModule,
  MatRadioModule,
  MatStepperModule,
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
  MatTabsModule,

  DragDropModule,

];

@NgModule({
  declarations: [...components, AnimateItemsDirective,],
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
  entryComponents: [AboutTrainerComponent, TrialCalenderComponent,],
  exports: [
    ...matcomponents, ...components, IonicModule,
  ],
})
export class SharedModule { }




