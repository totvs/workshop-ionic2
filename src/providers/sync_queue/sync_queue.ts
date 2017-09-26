import { Util } from './../util/util';
import { StorageService } from './../storage/storage';
import { SyncQueueItem } from './../../models/sync-queue-item-model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { UUID } from 'angular2-uuid';

/*
  Generated class for the SyncQueueProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SyncQueue {
  private key = "SyncQueue";
  constructor(public _http: Http/*, public _storage: StorageService, public _util: Util*/) {
  }

  // push(syncQueueItem: SyncQueueItem): Promise<string> {
  //   syncQueueItem.id = UUID.UUID();
  //   return this._storage.get(this.key)
  //     .then((data) => {
  //       if (data != null) {
  //         syncQueueItem.seq = data.length + 1;
  //         data.push(syncQueueItem);
  //       } else {
  //         data = [];
  //         syncQueueItem.seq = 1;
  //         data.push(syncQueueItem);
  //       }
  //       return this._storage.set(this.key, data)
  //         .then(() => {
  //           return this._storage.get(this._util.getHashFromUrl(syncQueueItem.url))
  //             .then((apiData) => {
  //               apiData.push(syncQueueItem.body);
  //               return this._storage.set(this._util.getHashFromUrl(syncQueueItem.url), apiData)
  //                 .then(() => {
  //                   return syncQueueItem.id;
  //                 })
  //             })
  //         });
  //     })
  // }

  // count() {
  //   return this._storage.get(this.key)
  //     .then((queueData) => {
  //       return queueData ? queueData.length : 0;
  //     });
  // }

  // getFirst() {
  //   return this._storage.get(this.key)
  //     .then((queueData) => {
  //       if (queueData) {
  //         queueData = queueData.sort(
  //           (a, b) => {
  //             if (a.seq > b.seq)
  //               return 1;
  //             if (a.seq > b.seq)
  //               return -1;
  //             else
  //               return 0;
  //           }
  //         );
  //         return queueData[0];
  //       } else {
  //         return null;
  //       }
  //     })
  // }

  // remove(id) {
  //   return this._storage.get(this.key)
  //     .then((queueData) => {
  //       var index = queueData.findIndex(i => i.id == id);
  //       if (index > -1) {
  //         queueData.splice(index, 1);
  //       }
  //       return this._storage.set(this.key, queueData);
  //     });
  // }

}
