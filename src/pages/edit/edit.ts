import { Customer } from './../../models/customer.model';
import { Http, HttpModule } from '@angular/http';
import { ApiClient } from './../../providers/api-client';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
  providers: [Http, HttpModule]
})
export class EditPage {
  customer: Customer = new Customer();
  title: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public apiClient: ApiClient) {
    if (navParams.get('customer')) {
      this.title = "Edição";
      this.customer = navParams.get('customer') as Customer;
    } else {
      this.title = "Inclusão";
    }
  }

  save() {
    // console.log('item: ', this.customer);
    this.apiClient.saveCustomer(this.customer).subscribe(
      (res) => {
        console.log('res: ', res);
      },
      (err) => {
        console.log('err: ', err);
      }
    )
  }
}
