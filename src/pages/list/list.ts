import { Customer } from './../../models/customer.model';
import { EditPage } from './../edit/edit';
import { Http, HttpModule } from '@angular/http';
import { ApiClient } from './../../providers/api-client';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [Http, HttpModule
  ]
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  customers: Customer[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiClient: ApiClient) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    // this.items = [];
    // for (let i = 1; i < 11; i++) {
    //   this.items.push({
    //     title: 'Item ' + i,
    //     note: 'This is item #' + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }
    var that = this;
    this.customers = [];
    this.apiClient.getCustomers().subscribe(
      (res) => {
        // console.log('RES: ', res);
        that.customers = res as Customer[];
      },
      (err) => {
        console.log('Erro: ', err);
      }
    );

  }

  itemTapped(event, customer) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(EditPage, {
      customer: customer
    });
  }

  newCustomer() {
    this.navCtrl.push(EditPage, {});
  }

}
