import { THFStorageService } from '@totvs/thf-mobile/app/services/thf-storage/thf-storage.service';
import { Network } from '@ionic-native/network';
import { THFSyncService } from '@totvs/thf-mobile/app/services/thf-sync/thf-sync.service';
import { Customer } from './../../models/customer.model';
import { EditPage } from './../edit/edit';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { THFModelSchema } from '@totvs/thf-mobile/app/models/thf-model-schema';
import { THFSyncConfig } from '@totvs/thf-mobile/app/models/thf-sync-config';
import { THFNetworkType } from '@totvs/thf-mobile/app/enums/thf-network-type.enum';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [Network]
})
export class ListPage {
  icons: string[];
  customers: Customer[];
  hasNext: boolean;
  currentPage: number;
  // eventSourcing: THFEventSourcing;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private toastCtrl: ToastController, private thfSync: THFSyncService, private thfStorage: THFStorageService, private network: Network, private _http: Http, ) {
    this.currentPage = 1;
    this.hasNext = false;
    // let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
    //   console.log('network was disconnected :-(');
    // });

    // this.eventSourcing = new THFEventSourcing(this.thfStorage, this._http);

    // let connectSubscription = this.network.onConnect().subscribe(() => {
    //   console.log('network connected!');
    //   // We just got a connection but we need to wait briefly
    //   // before we determine the connection type. Might need to wait.
    //   // prior to doing any api requests as well.
    //   // setTimeout(() => {
    //   //   if (this.network.type === 'wifi') {
    //   //     console.log('we got a wifi connection, woohoo!');
    //   //   }
    //   // }, 3000);
    // });


  }

  mapSchemas(): Promise<any> {
    let customerSchema = new THFModelSchema({
      getUrlApi: 'http://thfservices.totvs.com.br/customer-api/api/v1/customers',
      diffUrlApi: 'http://thfservices.totvs.com.br/customer-api/api/v1/customers/diff',
      name: 'Customers',
      fields: [
        'id', 'name'
      ],
      pageSize: 20,
      deletedField: 'deleted',
      idField: 'id'
    });

    // let userSchema = new THFModelSchema({
    //   getUrlApi: 'http://10.172.45.159:8200/api/v1/users',
    //   diffUrlApi: 'http://10.172.45.159:8200/api/v1/users/diff',
    //   name: 'Users',
    //   fields: [
    //     'id', 'name', 'login'
    //   ],
    //   pageSize: 20,
    //   deletedField: 'deleted',
    //   idField: 'id'
    // });

    return this.thfSync.prepare([customerSchema], new THFSyncConfig(THFNetworkType._3g, 10))
      .then(() => {
        console.log("Schemas mapped");
      });
  }

  ionViewDidEnter() {
    this.mapSchemas()
      .then(() => {
        // this.thfSync.loadData()
        // .subscribe((res) => {
        //   console.log("Retorno subscribe");
        //   res.forEach(
        //     (el) => {
        //       console.log('Entity: ' + el.entity + ' (' + el.data.length + ' loaded)');
        //     }
        //   )
        //   this.getData();
        // });
        this.getData();
      });
      this.thfSync.onSync().subscribe(() => {
        this.getData();
      });
  }

  itemTapped(event, customer) {
    this.navCtrl.push(EditPage, {
      customer: customer
    });
  }

  getData() {
    this.thfSync.getModel('Customers').find()
      .page(this.currentPage)
      .sort("name")
      .pageSize(10)
      // .select("id name")
      .exec()
      .then((data) => {
        this.customers = data.items;
        this.hasNext = data.hasNext;
      });

    // const thfQueue = new THFQueue("my_queue", this.thfStorage);
    // // thfQueue.enqueue({ campo1: '3', campo2: '4' }).then(
    // //   () => {
    // //     console.log("Item enfileirado");
    // //   });
    // thfQueue.dequeue()
    // .then((item) => {
    //     console.log('Desenfileirado: ', item);
    // });
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

  sync() {
    console.log("Syncing");
    this.thfSync.sync()
    .then(() => {
      this.getData();
      console.log("Synced");
      let toast = this.toastCtrl.create({
        message: 'Data synced',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    })
    .catch((err) => {
      console.log("Error on sync: ", err);
    });
  }
}
