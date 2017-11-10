import { THFSyncService } from '@totvs/thf-mobile/app/services/thf-sync/thf-sync.service';
import { THFModelSchema } from '@totvs/thf-mobile/app/models/thf-model-schema';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private thfSync: THFSyncService) {
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
      .then(() => {
        console.log("Schemas ready");
        // this.thfSync.loadData()
        //   .subscribe((res) => {
        //     console.log("Retorno subscribe");
        //     res.forEach(
        //       (el) => {
        //         console.log('Entity: ' + el.entity + ' (' + el.data.length + ' loaded)');
        //       }
        //     )
        //   });
      });
  } 
}
