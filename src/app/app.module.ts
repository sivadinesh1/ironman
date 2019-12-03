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
import { NameFormComponent } from './components/name-form/name-form.component';
import { RouteReuseStrategy } from '@angular/router';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Contacts } from '@ionic-native/contacts/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { Instagram } from '@ionic-native/instagram/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { Pedometer } from '@ionic-native/pedometer/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';


import { ImagePicker } from '@ionic-native/image-picker/ngx';

import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { Media } from '@ionic-native/media/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';


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
    LocalNotifications,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
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
    Network, OpenNativeSettings, NativeStorage, GooglePlus, Facebook,
    BarcodeScanner,
    Base64ToGallery,
    SMS,
    CallNumber,
    Contacts,
    SpeechRecognition,
    TextToSpeech,
    Instagram,
    Camera,
    Pedometer,
    SocialSharing,
    OneSignal,
    ImagePicker,
    MediaCapture,
    Media,
    StreamingMedia,
    PhotoViewer,
    File,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }




