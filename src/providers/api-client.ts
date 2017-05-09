import { Customer } from './../models/customer.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppConstants } from './../utils/app-constants';
import { Observable } from "rxjs/Observable";
/*
  Generated class for the ApiClient provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ApiClient {

  constructor(public http: Http) {
    console.log('Hello ApiClient Provider');
  }

  getCustomers(id: string = null): Observable<any> {
    console.log('GET REQUEST: ', AppConstants.API_URL + AppConstants.CUSTOMER_API);
    return this.http.get(AppConstants.API_URL + AppConstants.CUSTOMER_API)
      .map(
      res => {
        // console.log('GET RESPONSE: ', res);
        return res.json();
      }
      );
  }

  saveCustomer(customer: Customer): Observable<any> {
    if(customer.id) {
      console.log('PUT REQUEST: ', AppConstants.API_URL + AppConstants.CUSTOMER_API + '/' + customer.id, customer);
      return this.http.put(AppConstants.API_URL + AppConstants.CUSTOMER_API + '/' + customer.id, customer);
    } else {
      console.log('POST REQUEST: ', AppConstants.API_URL + AppConstants.CUSTOMER_API, customer);
      return this.http.post(AppConstants.API_URL + AppConstants.CUSTOMER_API, customer);
    }
  }

  deleteCustomer(id: string): Observable<any> {
      console.log('DELETE REQUEST: ', AppConstants.API_URL + AppConstants.CUSTOMER_API + '/' + id);
      return this.http.delete(AppConstants.API_URL + AppConstants.CUSTOMER_API + '/' + id);
  }

}
