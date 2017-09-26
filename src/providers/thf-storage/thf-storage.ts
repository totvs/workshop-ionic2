import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Storage } from '@ionic/storage';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class THFStorageService {

  constructor(private _storage: Storage) {

  }

  get(key: string): Observable<any> {
    return Observable.fromPromise(this._storage.get(key))
      .map(x => {
        console.log('Veio data: ', x);
        return x;
      });
  }

  set(key: string, value: any): Observable<any> {
    return Observable.fromPromise(this._storage.set(key, value))
      .map((x) => {
        console.log("Set: ", x);
        return x;
      })
      ;
  }

  exists(key: string): Observable<boolean> {
    return this.get(key)
      .map(
      (data) => {
        return data != null && data != undefined;
      }
      );
  }

  remove(key: string): Observable<any> {
    return Observable.fromPromise(this._storage.remove(key));
  }

  length(): Observable<number> {
    return Observable.fromPromise(this._storage.length());
  }

  keys(): Observable<string[]> {
    return Observable.fromPromise(this._storage.keys());
  }

  forEach(itCallback): Observable<null> {
    return Observable.fromPromise(this._storage.forEach(itCallback));
  }

  clear(): Observable<any> {
    return Observable.fromPromise(this._storage.clear());
  }

  appendToArray(key: string, value: Array<any>): Observable<any> {
    console.log("Received: " + value.length);
    return this.get(key)
      .catch(err => {
        console.log("Err: ", err);
        return Observable.of([]);
      })
      .flatMap((data) => {
        if (data == null || data == undefined) {
          console.log("veio null");
          data = [];
        }
        console.log("Data before: " + data.length);
        let newData = data.concat(value);
        console.log("newData: " + newData.length);
        return this.set(key, newData);
      });
  }

  ready(): Observable<LocalForage> {
    return Observable.fromPromise(this._storage.ready());
  }

}
