import { THFSyncProvider } from './../../providers/thf-sync/thf-sync';
import { Customer } from './../../models/customer.model';
import { EditPage } from './../edit/edit';
import { Http, HttpModule } from '@angular/http';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { THFModelSchema } from '../../models/thf-model-schema';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [Http, HttpModule
  ]
})
export class ListPage {
  icons: string[];
  customers: Customer[];
  hasNext: boolean;
  currentPage: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private thfSync: THFSyncProvider) {
    this.currentPage = 1;
    this.hasNext = false;
  }

  mapSchemas(): Promise<any> {
    let customerSchema = new THFModelSchema({
      urlApi: 'http://localhost:8200/api/v1/customers',
      name: 'Customers',
      fields: [
        'id', 'name'
      ],
      pageSize: 20
    });

    let userSchema = new THFModelSchema({
      urlApi: 'http://localhost:8200/api/v1/users',
      name: 'Users',
      fields: [
        'id', 'name', 'login'
      ],
      pageSize: 20
    });

    return this.thfSync.prepare([customerSchema, userSchema])
      .then(() => {
        console.log("Schemas mapped");
      });
  }

  ionViewDidEnter() {
    this.mapSchemas()
      .then(() => {

        this.getData();

        this.thfSync.getModel('Customers')
        .findOne({name: 'Cliente 02'})
        .exec()
        .then((xxx) => {
          console.log('Veio: ', xxx);
        });



        
      });
  }

  itemTapped(event, customer) {
    // // That's right, we're pushing to ourselves!
    // this.navCtrl.push(EditPage, {
    //   customer: customer
    // });
  }

  getData() {
    this.thfSync.getModel('Customers').find()
      .page(this.currentPage)
      .sort("name")
      .pageSize(10)
      .select("id name -password")
      .exec()
      .then((data) => {
        this.customers = data.items;
        this.hasNext = data.hasNext;
      });
    ;
    // this.thfSync["Users"]
    // this.thfSync.getModel('Customers').findAll(this.currentPage, 10, "-name")
    // .then((data) => {
    //   this.customers = data.items;
    //   this.hasNext = data.hasNext;
    // });

    // this.thfSync['oij'].findAll(this.currentPage, 10, "-name")
    //   .then((data) => {
    //     this.customers = data.items;
    //     this.hasNext = data.hasNext;
    //   });
  }

  newCustomer() {
    this.navCtrl.push(EditPage, {});
  }

  nextPage() {
    this.currentPage++;
    this.getData();
  }

  prevPage() {
    this.currentPage--;
    this.getData();
  }

  // showErrorAlert(msg) {
  //   let alert = this.alertCtrl.create({
  //     title: 'Erro',
  //     subTitle: 'Erro: ' + msg,
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }

}
