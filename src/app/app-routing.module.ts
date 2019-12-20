import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'walkthrough', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'walkthrough', loadChildren: () => import('./pages/auth/walkthrough/walkthrough.module').then(m => m.WalkthroughPageModule) },

  { path: 'auth/login', loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginPageModule) },
  { path: 'auth/signup', loadChildren: () => import('./pages/auth/signup/signup.module').then(m => m.SignupPageModule) },
  { path: 'auth/forgot-password', loadChildren: () => import('./pages/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule) },
  { path: 'auth/gp-login', loadChildren: () => import('./pages/auth/gp-login/gp-login.module').then(m => m.GpLoginPageModule) },
  { path: 'auth/fb-login', loadChildren: () => import('./pages/auth/fb-login/fb-login.module').then(m => m.FbLoginPageModule) },

  { path: 'auth/verify-mobile-number/:username/:userid', loadChildren: () => import('./pages/auth/verify-mobile-number/verify-mobile-number.module').then(m => m.VerifyMobileNumberPageModule) },
  { path: 'buy/packs-service/:subcategoryid/:serviceid/:sessions', loadChildren: () => import('./pages/buy/packs-service/packs-service.module').then(m => m.PacksServicePageModule) },
  { path: 'service/register/:serviceid/:userid/:centerid', loadChildren: () => import('./pages/service/register/register.module').then(m => m.RegisterPageModule) },

  { path: 'settings', loadChildren: './pages/user/settings/settings.module#SettingsPageModule' },

  // { path: 'list-corporates', loadChildren: () => import('./pages/setup/list-corporates/list-corporates.module').then(m => m.ListCorporatesPageModule) },

  { path: 'add-enquiry', loadChildren: './pages/leads/enquiry/enquiry.module#EnquiryPageModule' },
  { path: 'view-packages/:id', loadChildren: './pages/leads/enquiry/view-packages/view-packages.module#ViewPackagesPageModule' },

  { path: 'trial-calendar', loadChildren: () => import('./pages/leads/enquiry/trial-calender/trial-calender.module').then(m => m.TrialCalenderPageModule) },

  // { path: 'trial-calender', loadChildren: './pages/leads/enquiry/trial-calender/trial-calender.module#TrialCalenderPageModule' },


  { path: 'app', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'smile-rate', loadChildren: () => import('./pages/try/smile-rate/smile-rate.module').then(m => m.SmileRatePageModule) },
  { path: 'slider-test', loadChildren: () => import('./pages/try/slider/slider.module').then(m => m.SliderPageModule) },
  { path: 'scroll-animate', loadChildren: () => import('./pages/try/scroll-animate/scroll-animate.module').then(m => m.ScrollAnimatePageModule) },
  { path: 'scroll-vanish', loadChildren: () => import('./pages/try/scroll-vanish/scroll-vanish.module').then(m => m.ScrollVanishPageModule) },
  { path: 'animated-heart-like', loadChildren: () => import('./pages/try/animated-heart-like/animated-heart-like.module').then(m => m.AnimatedHeartLikePageModule) },
  { path: 'animate-list', loadChildren: () => import('./pages/try/animate-list/animate-list.module').then(m => m.AnimateListPageModule) },

  { path: 'cart-home', loadChildren: () => import('./pages/try/cart/cart-home/cart-home.module').then(m => m.CartHomePageModule) },
  { path: 'cart', loadChildren: () => import('./pages/try/cart/cart.module').then(m => m.CartPageModule) },

  { path: 'timer', loadChildren: () => import('./pages/timer/timer.module').then(m => m.TimerPageModule) },
  { path: 'calci', loadChildren: () => import('./pages/try/calci/calci.module').then(m => m.CalciPageModule) },
  { path: 'meditate', loadChildren: () => import('./pages/meditate/meditate.module').then(m => m.MeditatePageModule) },
  { path: 'local-notification', loadChildren: () => import('./pages/try/local-notification/local-notification.module').then(m => m.LocalNotificationPageModule) },


  { path: 'breather', loadChildren: () => import('./pages/breather/breather.module').then(m => m.BreatherPageModule) },
  { path: 'animated-div', loadChildren: () => import('./pages/try/animated-div/animated-div.module').then(m => m.AnimatedDivPageModule) },
  { path: 'drag-drop', loadChildren: () => import('./pages/try/drag-drop/drag-drop.module').then(m => m.DragDropPageModule) },

  { path: 'event-calendar', loadChildren: () => import('./pages/try/event-calendar/event-calendar.module').then(m => m.EventCalendarPageModule) },
  { path: 'bmi-calc', loadChildren: () => import('./pages/try/bmi-calc/bmi-calc.module').then(m => m.BmiCalcPageModule) },

  { path: 'qr-code', loadChildren: () => import('./pages/try/qr-code/qr-code.module').then(m => m.QrCodePageModule) },
  { path: 'sms', loadChildren: () => import('./pages/try/sms/sms.module').then(m => m.SmsPageModule) },
  { path: 'contact-mgmt', loadChildren: () => import('./pages/try/contact-mgmt/contact-mgmt.module').then(m => m.ContactMgmtPageModule) },
  { path: 'speech-text', loadChildren: () => import('./pages/try/speech-text/speech-text.module').then(m => m.SpeechTextPageModule) },

  { path: 'text-speech', loadChildren: () => import('./pages/try/text-speech/text-speech.module').then(m => m.TextSpeechPageModule) },

  { path: 'instagram', loadChildren: () => import('./pages/try/instagram/instagram.module').then(m => m.InstagramPageModule) },
  { path: 'pedometer', loadChildren: () => import('./pages/try/pedometer/pedometer.module').then(m => m.PedometerPageModule) },
  { path: 'social-share', loadChildren: () => import('./pages/try/social-share/social-share.module').then(m => m.SocialSharePageModule) },


  { path: 'media', loadChildren: () => import('./pages/try/media/media.module').then(m => m.MediaPageModule) },

  { path: 'paymentgateway/:inputval', loadChildren: () => import('./pages/try/paymentgateway/paymentgateway.module').then(m => m.PaymentgatewayPageModule) },

  { path: 'image-crop', loadChildren: () => import('./pages/try/image-crop/image-crop.module').then(m => m.ImageCropPageModule) },




  { path: 'card-animate', loadChildren: './pages/try/card-animate/card-animate.module#CardAnimatePageModule' },

  { path: 'page-not-found', loadChildren: () => import('./commons/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) },
  { path: '**', redirectTo: '/page-not-found' },
  { path: 'member-profile-view', loadChildren: './pages/setup/profiles/member-profile-view/member-profile-view.module#MemberProfileViewPageModule' },
  { path: 'trainer-profile-view', loadChildren: './pages/setup/profiles/trainer-profile-view/trainer-profile-view.module#TrainerProfileViewPageModule' },
  { path: 'trial-calender', loadChildren: './pages/leads/enquiry/trial-calender/trial-calender.module#TrialCalenderPageModule' },

  // { path: 'my-profile', loadChildren: './pages/setup/profiles/my-profile/my-profile.module#MyProfilePageModule' },
  // { path: 'profile-view', loadChildren: './pages/setup/profiles/profile-view/profile-view.module#ProfileViewPageModule' },
  // { path: 'profile', loadChildren: './pages/setup/profiles/profile/profile.module#ProfilePageModule' },
  // { path: 'trainer', loadChildren: './pages/setup/profiles/trainer/trainer.module#TrainerPageModule' },
































];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled' })

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


