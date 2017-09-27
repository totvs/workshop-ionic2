import { Promise } from 'rxjs/Promise';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Storage } from '@ionic/storage';

@Injectable()
export class THFStorageService {

  constructor(private _storage: Storage) {

  }

  get(key: string): Promise<any> {
    return this._storage.get(key);
  }

  set(key: string, value: any): Promise<any> {
    return this._storage.set(key, value);
  }

  exists(key: string): Promise<boolean> {
    return this.get(key)
      .then((data) => {
        return data != null && data != undefined;
      });
  }

  remove(key: string): Promise<any> {
    return this._storage.remove(key);
  }

  length(): Promise<number> {
    return this._storage.length();
  }

  keys(): Promise<string[]> {
    return this._storage.keys();
  }

  forEach(itCallback): Promise<null> {
    return this._storage.forEach(itCallback);
  }

  clear(): Promise<any> {
    return this._storage.clear();
  }

  appendToArray(key: string, value: Array<any>): Promise<any> {
    return this.get(key)
      .then(
      (data) => {
        if (data == null || data == undefined)
          data = [];
        let newData = data.concat(value);
        return this.set(key, newData);
      }
      )
  }

  ready(): Promise<LocalForage> {
    return this._storage.ready();
  }

}
