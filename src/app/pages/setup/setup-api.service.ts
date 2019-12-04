import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { restApiUrl } from 'src/environments/environment';
import { share, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SetupApiService {
  restApiUrl = restApiUrl;

  constructor(private httpclient: HttpClient) { }


  // corporates
  getAllCorporates(status: any) {
    return this.httpclient.get(`${this.restApiUrl}/api/getallcorporates/${status}`);
  }

  // return this.setupapiservice.getAllCorporates('Y')
  // .pipe(
  //     map((data) => new ResolvedEntity(data)),
  //     catchError((err: any) => of(new ResolvedEntity(null, err)))
  // );

  addCorporate(submitform: any) {
    // return this.httpclient.post<any>(this.restApiUrl + '/api/corporate', submitform, { observe: 'response' });
    return this.httpclient.post<any>(this.restApiUrl + '/api/corporate', submitform, { observe: 'response' })
      .pipe(map((data) => data.body));
  }

  updateCorporate(submitform: any) {
    return this.httpclient.post<any>(this.restApiUrl + '/api/update-corporate', submitform, { observe: 'response' });
  }


  getCorporatesCount(status: any) {
    return this.httpclient.get(`${this.restApiUrl}/api/getcorporatescount/${status}`);
  }

  // centers
  getAllCenters(status: any, corporate_id: any) {
    return this.httpclient.get(`${this.restApiUrl}/api/getallcenters/${status}/${corporate_id}`);
  }

  addCenter(submitform: any) {
    return this.httpclient.post<any>(this.restApiUrl + '/api/center', submitform, { observe: 'response' })
      .pipe(map((data) => data.body));
  }




  updateCenter(submitform: any) {
    return this.httpclient.post<any>(this.restApiUrl + '/api/update-center', submitform, { observe: 'response' });
  }


  getCentersCount(status: any, corporateid: any) {
    return this.httpclient.get(`${this.restApiUrl}/api/getcenterscount/${status}/${corporateid}`);
  }


  //  Generric Profiles (member/trainer/mc)
  getAllProfiles(center_id: string, role_id: string, status: string) {
    return this.httpclient.get(`${this.restApiUrl}/api/getallprofiles/${center_id}/${role_id}/${status}`);
  }

  // Trainers
  addTrainer(submitform: any) {
    return this.httpclient.post<any>(this.restApiUrl + '/api/add-trainer', submitform, { observe: 'response' })
      .pipe(map((data) => data.body));
  }

  editTrainer(submitform: any) {

    return this.httpclient.post<any>(this.restApiUrl + '/api/edit-trainer', submitform, { observe: 'response' })
      .pipe(map((data) => data.body));
  }

  //  Generric Profiles (member/trainer/mc)
  getAllTrainers(center_id: string, role_id: string, status: string) {
    return this.httpclient.get(`${this.restApiUrl}/api/getalltrainers/${center_id}/${role_id}/${status}`);
  }

  // mc
  addMc(submitform: any) {
    return this.httpclient.post<any>(this.restApiUrl + '/api/add-mc', submitform, { observe: 'response' })
      .pipe(map((data) => data.body));
  }

  editMc(submitform: any) {
    return this.httpclient.post<any>(this.restApiUrl + '/api/edit-mc', submitform, { observe: 'response' })
      .pipe(map((data) => data.body));
  }

  // mc
  addCa(submitform: any) {
    return this.httpclient.post<any>(this.restApiUrl + '/api/add-ca', submitform, { observe: 'response' })
      .pipe(map((data) => data.body));
  }

  editCa(submitform: any) {
    return this.httpclient.post<any>(this.restApiUrl + '/api/edit-ca', submitform, { observe: 'response' })
      .pipe(map((data) => data.body));
  }

  // service category
  getAllServiceCategories(status: any, center_id: any) {
    return this.httpclient.get(`${this.restApiUrl}/api/getallservicecategories/${status}/${center_id}`);
  }

  // Services
  getAllServices(status: any, center_id: any) {
    return this.httpclient.get(`${this.restApiUrl}/api/getallservices/${status}/${center_id}`);
  }

  // Services by categoryID
  getServices(status: any, center_id: any, category_id: any) {
    return this.httpclient.get(`${this.restApiUrl}/api/getservices/${status}/${center_id}/${category_id}`, { observe: 'response' })
      .pipe(map((data) => data.body));
  }

  getServiceSubCategory(category_id: any) {

    return this.httpclient.get(`${this.restApiUrl}/api/getservicesubcategory/${category_id}`)
      .pipe(map((data: any) => data.obj));
  }


  getServiceSubCatByCat(center_id: any, category_id: any) {

    return this.httpclient.get(`${this.restApiUrl}/api/getservicesubcatbycat/${center_id}/${category_id}`)
      .pipe(map((data: any) => data.obj));
  }

  //   mapToAddress(): Observable<Address[]> {
  //     this.getClients.pipe(
  //       map((clients: Client[]) => clients.map(client => client.address))
  //     )
  //   }
  //   .pipe(
  //     map((data) => new ResolvedEntity(data)),
  //     catchError((err: any) => of(new ResolvedEntity(null, err)))
  // );


  // service
  addService(submitform: any) {
    return this.httpclient.post<any>(this.restApiUrl + '/api/add-services', submitform, { observe: 'response' });
  }

  updateService(submitform: any) {
    return this.httpclient.post<any>(this.restApiUrl + '/api/update-service', submitform, { observe: 'response' });
  }

  addServicecategory(submitform: any) {
    return this.httpclient.post<any>(this.restApiUrl + '/api/service-category', submitform, { observe: 'response' });
  }

  updateServiceCategory(submitform: any) {
    return this.httpclient.put<any>(this.restApiUrl + '/api/servicecategory', submitform, { observe: 'response' });
  }

  // sscategory
  getAllServiceSubCategories(status: any, center_id: any) {
    return this.httpclient.get(`${this.restApiUrl}/api/getallservicesubcategories/${status}/${center_id}`);
  }

  addSscategory(submitform: any) {
    return this.httpclient.post<any>(this.restApiUrl + '/api/service-sub-category', submitform, { observe: 'response' });
  }

  updateSSCategory(submitform: any) {
    return this.httpclient.put<any>(this.restApiUrl + '/api/sscategory', submitform, { observe: 'response' });
  }


  updateEntityStatus(entity: string, id: number, status: string, loggedinuserid: number, whenupdated: any) {
    return this.httpclient.put<any>(`${this.restApiUrl}/api/entity-status/${entity}/${id}/${status}/${loggedinuserid}/${whenupdated}`, { observe: 'response' });
  }





}


