import { ApiClient } from './../../providers/api-client/api-client';
import { Customer } from './../../models/customer.model';
import { EditPage } from './../edit/edit';
import { Http, HttpModule } from '@angular/http';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

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
  status: string;
  pending: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiClient: ApiClient, public alertCtrl: AlertController) {
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
  }

  ionViewDidEnter() {
    this.readCustomers(this);
    // this.refreshData(this);
  }

  itemTapped(event, customer) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(EditPage, {
      customer: customer
    });
  }

  // private mySubscription;
  // private timerSubscription;

  // refreshData(that) {
  //   that.mySubscription = that.apiClient.getCustomers().subscribe(
  //     (res) => {
  //       let customers = res.data as Customer[];
  //       that.customers = customers.sort(
  //         (a, b) => {
  //           if (a.name > b.name)
  //             return 1;
  //           if (a.name > b.name)
  //             return -1;
  //           else
  //             return 0;
  //         }
  //       );
  //       that.subscribeToData(that);
  //     }
  //   )
  // }

  // subscribeToData(that) {
  //   that.timerSubscription = Observable.timer(5000).first().subscribe(() => that.refreshData(that));
  // }

  readCustomers(that) {
    // this.customers = [];
    console.log("Loading customers");
    // that.syncQueue.count()
    //   .then((count) => {
    //     that.pending = count;
        // that.apiClient.getCustomers().subscribe(
        //   (res) => {
        //     // that.status = res.status == "OFF" ? "OFFLINE" : "ONLINE";
        //     // debugger;
        //     let customers = res;
        //     that.customers = customers.sort(
        //       (a, b) => {
        //         if (a.name > b.name)
        //           return 1;
        //         if (a.name < b.name)
        //           return -1;
        //         else
        //           return 0;
        //       }
        //     );
        //     // if (res.status == "OFF")
        //     setTimeout(that.readCustomers, 2000, that);
        //   },
        //   (err) => {
        //     that.showErrorAlert(err);
        //   }
        // );
      // });
  }

  newCustomer() {
    this.navCtrl.push(EditPage, {});
  }

  showErrorAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Erro',
      subTitle: 'Erro: ' + msg,
      buttons: ['OK']
    });
    alert.present();
  }

}
