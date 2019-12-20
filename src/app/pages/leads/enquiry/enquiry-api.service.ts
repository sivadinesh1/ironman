import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { restApiUrl } from 'src/environments/environment';
import { share, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EnquiryApiService {
    restApiUrl = restApiUrl;

    constructor(private httpclient: HttpClient) { }



    addEnquiry(submitform: any) {
        return this.httpclient.post<any>(this.restApiUrl + '/api/add-enquiry', submitform, { observe: 'response' })
            .pipe(map((data) => data.body));
    }

    getFullEnquiryDetails(userid) {
        return this.httpclient.get(`${this.restApiUrl}/api/getfullenquirydetails/${userid}`);
    }


}


