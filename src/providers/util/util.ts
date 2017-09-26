import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5'

@Injectable()
export class Util {
  
  constructor() {
  }

  getHashFromUrl(url: string): string {
    return Md5.hashStr(url).toString();
  }
  
}
