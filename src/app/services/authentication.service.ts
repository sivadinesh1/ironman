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
import { Corporates } from '../pages/setup/corporates/corporates';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  restApiUrl = restApiUrl;
  usrobj: any;

  userdata: Observable<any>;
  authState = new BehaviorSubject(null);

  role: any;
  userid: any;
  loggedinuserid: number;
  center: any;
  corporate: Corporates;

  storagemode: any;
  device: any;
  errormsg = 'Something went wrong. Contact administrator.';

  token: any;
  username: any;


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

      this.getLocalData();

      // Filter out null values which is first behaviour Subject value
      this.userdata = this.authState
        .asObservable()
        .pipe(filter(response => response));

    });
  }



  loadUser() {
    // Normally load e.g. JWT at this point
    this.storagemode.get('localstoredata').then(data => {
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
    console.log('object MM ' + restApiUrl);
    return this.httpClient.post<any>(`${restApiUrl}/api/authenticate`, { username, password }).pipe(
      map(
        userData => {

          console.log('object...' + JSON.stringify(userData));

          if (userData.message === 'SUCCESS') {
            this.storagemode.clear();
            let tokenStr = 'Bearer ' + userData.additionalinfo;

            this.storagemode.set('username', username);
            this.storagemode.set('token', tokenStr);
            this.storagemode.set('localstoredata', userData.obj);
            this.authState.next(userData.obj);

            this.token = tokenStr;
            this.username = username;

            this.loggedinuserid = userData.obj.id;
            if (userData.obj.center !== null) {
              this.center = userData.obj.center;
            }


            this.corporate = userData.obj.corporate;

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

          let tokenStr = 'Bearer ' + userData.additionalinfo;

          this.storagemode.set('username', username);
          this.storagemode.set('token', tokenStr);
          this.storagemode.set('localstoredata', userData.obj);
          this.authState.next(userData.obj);

          this.token = tokenStr;
          this.username = username;

          this.loggedinuserid = userData.obj.id;
          if (userData.obj.center !== null) {
            this.center = userData.obj.center;
          }


          this.corporate = userData.obj.corporate;

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


  getLocalData() {


    this.storagemode.get('localstoredata').then(data => {

      this.usrobj = data;

      if (this.usrobj != null) {
        if (this.usrobj.center !== null) {
          this.center = this.usrobj.center;
        }

        this.loggedinuserid = this.usrobj.id;
        this.corporate = this.usrobj.corporate;
      }




    });


    this.storagemode.get('token').then(data => {
      this.token = data;
    });

    this.storagemode.get('username').then(data => {
      this.username = data;
    });


  }





}

