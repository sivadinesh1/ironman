import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';

import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { restApiUrl } from 'src/environments/environment';




@Injectable({
    providedIn: 'root'
})
export class AuthApiService {

    restApiUrl = restApiUrl;

    authenticationState = new BehaviorSubject(false);
    currentURL: any;
    userRole = new BehaviorSubject('');

    constructor(
        private httpClient: HttpClient, private plt: Platform,
        private storage: Storage,
        private nativeStorage: NativeStorage,

        @Inject(PLATFORM_ID) private platformId: any
    ) {
        this.plt.ready().then(() => {
            console.log('when calling 1 >>' + this.authenticationState.value);
            this.currentURL = window.location.href;



            console.log('when calling after 1 >>' + this.authenticationState.value);
        });
    }






    getUsers(username) {

        return this.httpClient.get<any>(`${restApiUrl}/api/getuserinfo/${username}`).pipe(
            map(
                userData => {

                    console.log('object...' + JSON.stringify(userData));

                    return userData;
                }
            )

        );
    }










}