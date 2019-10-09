import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { isPlatformBrowser, } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Platform, } from '@ionic/angular';

import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { restApiUrl } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  restApiUrl = restApiUrl;

  userdata: Observable<any>;
  authState = new BehaviorSubject(null);

  role: any;
  userid: any;


  storagemode: any;
  device: any;
  errormsg = 'Something went wrong. Contact administrator.';

  constructor(
    private httpClient: HttpClient, private plt: Platform,
    private storage: Storage,
    private nativeStorage: NativeStorage,

    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.plt.ready().then(() => {


      if (isPlatformBrowser(this.platformId)) {
        this.storagemode = this.storage;
        this.device = 'browser';
      } else {
        this.storagemode = this.nativeStorage;
        this.device = 'mobile';
      }


      this.loadUser();

      // Filter out null values which is first behaviour Subject value
      this.userdata = this.authState
        .asObservable()
        .pipe(filter(response => response));

    });
  }



  loadUser() {
    // Normally load e.g. JWT at this point
    this.storage.get('localstoredata').then(data => {
      if (data) {
        this.authState.next(data);
      } else {
        this.authState.next({ userdata: null, role: null });

      }
    });
  }


  setLocalStoreItems(key, value) {
    this.storagemode.set(key, value);
  }

  getLocalStoreItems(key): Promise<string> {
    return this.storagemode.get(key);
  }


  authenticate(username, password) {

    return this.httpClient.post<any>(`${restApiUrl}/api/authenticate`, { username, password }).pipe(
      map(
        userData => {

          console.log('object...' + JSON.stringify(userData));

          if (userData.message === 'SUCCESS') {
            this.storagemode.clear();
            let tokenStr = 'Bearer ' + userData.additionalInfo;

            this.storagemode.set('username', username);
            this.storagemode.set('token', tokenStr);
            this.storagemode.set('localstoredata', userData.obj);
            this.authState.next(userData.obj);
          }
          return userData;
        }
      )

    );
  }

  register(username, password) {

    return this.httpClient.post<any>(`${restApiUrl}/api/register`, { username, password }).pipe(
      map(
        userData => {
          this.storagemode.clear();

          let tokenStr = 'Bearer ' + userData.additionalInfo;

          this.storagemode.set('username', username);
          this.storagemode.set('token', tokenStr);
          this.storagemode.set('userdata', userData.obj);
          this.authState.next(userData.obj);

          return userData;
        }
      )

    );
  }

  async logOut() {
    await this.storagemode.clear();
    this.authState.next(null);
  }

  getRole() {
    return this.role;
  }

  setRole(role) {
    this.role = role;
  }

  setUserid(userid) {
    this.userid = userid;;
  }

  getUserid() {
    return this.userid;
  }

}