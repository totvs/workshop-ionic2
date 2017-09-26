import { Customer } from './../../models/customer.model';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AppConstants } from './../../utils/app-constants';
import { Observable } from "rxjs/Observable";
// import { RequestProvider } from './../request/request';
/*
  Generated class for the ApiClient provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ApiClient {

  constructor(/*public _request: RequestProvider*/) {
    console.log('Hello ApiClient Provider');
  }

  // getCustomers(): Observable<Customer[]> {
  //   console.log("Getting from api");
  //   return this._request.get(AppConstants.API_URL + AppConstants.CUSTOMER_API);
  // }


  // saveCustomer(customer: Customer): Observable<any> {
  //   // if (customer.id) {
  //   //   console.log('PUT REQUEST: ', AppConstants.API_URL + AppConstants.CUSTOMER_API + '/' + customer.id, customer);
  //   //   return this.http.put(AppConstants.API_URL + AppConstants.CUSTOMER_API + '/' + customer.id, customer);
  //   // } else {
  //   //   console.log('POST REQUEST: ', AppConstants.API_URL + AppConstants.CUSTOMER_API, customer);
  //   /////////////////// return this._request.post(AppConstants.API_URL + AppConstants.CUSTOMER_API, customer)
  //   // .catch((err) => {
  //   //   return this.syncQueue.push(AppConstants.API_URL + AppConstants.CUSTOMER_API, customer)
  //   //     .then(() => {
  //   //       return "OK";
  //   //     })
  //   // });
  // }

  // deleteCustomer(id: string): Observable<any> {
  //   console.log('DELETE REQUEST: ', AppConstants.API_URL + AppConstants.CUSTOMER_API + '/' + id);
  //   return this.http.delete(AppConstants.API_URL + AppConstants.CUSTOMER_API + '/' + id);
  // }

}
