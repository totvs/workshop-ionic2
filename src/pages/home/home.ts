import { THFModelSchema } from './../../models/thf-model-schema';
import { THFSyncProvider } from './../../providers/thf-sync/thf-sync';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private thfSync: THFSyncProvider) {
    this.buildSchemas();
  }

  buildSchemas() {
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

    this.thfSync.prepare([customerSchema, userSchema])
      .subscribe(() => {
        this.thfSync.loadData()
          .subscribe((res) => {
            res.forEach(
              (el) => {
                console.log('Entity: ' + el.entity + ' (' + el.data.length + ' loaded)');
              }
            )
          });
      });
  } 
}
