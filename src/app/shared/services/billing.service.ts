import { Injectable } from '@angular/core';
import {HttpHelisa} from "../../shared/app.http.helisa";
import {Response, Headers} from "@angular/http";
import {Subject, Observable} from "rxjs";
import { environment } from '../../../environments/environment';

import { Billing } from "../../model/Billing";

@Injectable()
export class BillingService {

  constructor(private http : HttpHelisa) {}

  getUrl( model : string){
    return environment.url + model;
  }

  saveBilling(billing) {
    let header = new Headers({'Content-type':'application/json'});
    console.log(billing);
    return this.http.post(this.getUrl('/user/save-data-billing/'), JSON.stringify(billing), {headers: header, withCredentials : true}).map(
      (response: Response ) => {
        return response.json();
      }
    );
  }

  getBilling(company){
    return this.http.get(environment.url + '/user/get-data-billing?company=' + company, {withCredentials : true}).map(
      ( response: Response ) => {
        if( response.text() ) {
          const dataBilling = new Billing(null, '', '', '', '', '');
          return Object.assign(dataBilling, response.json());
        }
        return null;
      }
    )
  }

  getBillings(company) {
    return this.http.get(environment.url + '/user/electronicBillings?company=' + company+'&page=0&limit=10000', {withCredentials : true}).map(
      ( response: Response ) => response.json()
    )
  }

}
