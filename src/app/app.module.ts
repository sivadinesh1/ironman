import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BrowserModule } from '@angular/platform-browser';
// import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared.module';

import { Network } from '@ionic-native/network/ngx';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { ComponentsModule } from './components/components.module';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './services/http-error-interceptor';
import { ConfigService } from './services/config.service';
import { IonicStorageModule } from '@ionic/storage';
import { FormDirective } from './util/directives/form.directive';


const appConfig = (config: ConfigService) => {
  return () => {
    return config.loadConfig();
  }
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, BrowserAnimationsModule, ReactiveFormsModule,
    SharedModule, HttpClientModule, ComponentsModule,
    IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule],

  providers: [
    StatusBar,
    SplashScreen,

    // { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appConfig,
      multi: true,
      deps: [ConfigService]

    },
    Network, OpenNativeSettings, NativeStorage, GooglePlus, Facebook
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }




