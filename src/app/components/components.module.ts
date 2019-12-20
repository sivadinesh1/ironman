import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



import { CheckboxWrapperComponent } from './checkbox-wrapper/checkbox-wrapper.component';
import { ShowHidePasswordComponent } from './show-hide-password/show-hide-password.component';
import { CountdownTimerComponent } from './countdown-timer/countdown-timer.component';
import { CounterInputComponent } from './counter-input/counter-input.component';
import { RatingInputComponent } from './rating-input/rating-input.component';
import { ShellModule } from '../shell/shell.module';
import { CurrencyPadComponent } from './currency-pad/currency-pad.component';
import { ServicesCardComponent } from './services-card/services-card.component';
import { AnimatedLikeComponent } from './animated-like/animated-like.component';
import { PhonePadComponent } from './phone-pad/phone-pad.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ShellModule,
    IonicModule.forRoot()
  ],
  declarations: [
    CheckboxWrapperComponent,
    ShowHidePasswordComponent,
    CountdownTimerComponent,
    CounterInputComponent,
    RatingInputComponent,
    CurrencyPadComponent,
    PhonePadComponent,
    ServicesCardComponent,
    AnimatedLikeComponent
  ],
  exports: [
    ShellModule,
    CheckboxWrapperComponent,
    ShowHidePasswordComponent,
    CountdownTimerComponent,
    CounterInputComponent,
    RatingInputComponent,
    CurrencyPadComponent,
    PhonePadComponent,
    ServicesCardComponent,
    AnimatedLikeComponent
  ],
  entryComponents: [CurrencyPadComponent, PhonePadComponent, ServicesCardComponent],
})
export class ComponentsModule { }
