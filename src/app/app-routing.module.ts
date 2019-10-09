import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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


  { path: 'app', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) },

  { path: 'page-not-found', loadChildren: () => import('./commons/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) },
  { path: '**', redirectTo: '/page-not-found' },


  // { path: 'edit-corporates', loadChildren: './pages/setup/edit-corporates/edit-corporates.module#EditCorporatesPageModule' },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// @NgModule({
//   imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})] })