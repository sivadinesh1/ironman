import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHttpInterceptorService implements HttpInterceptor {
  token: any;
  username: any;

  constructor(private storage: Storage,
    private nativeStorage: NativeStorage,

    @Inject(PLATFORM_ID) private platformId: any) {


    if (isPlatformBrowser(this.platformId)) {
      this.token = this.storage.getItem('token');
      this.username = this.storage.getItem('username');
    } else {
      this.token = this.nativeStorage.getItem('token');
      this.username = this.nativeStorage.getItem('username');
    }


  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (this.username && this.token) {
      req = req.clone({
        setHeaders: {
          Authorization: this.token
        }
      })
    }

    return next.handle(req);

  }
}