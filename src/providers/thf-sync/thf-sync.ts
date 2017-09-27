import { Observable } from 'rxjs/Observable';
import { THFStorageService } from './../thf-storage/thf-storage';
import { THFModelSchema } from './../../models/thf-model-schema';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/expand';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';
/*
  Generated class for the ThfSyncProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class THFSyncProvider {

	private schemas: THFModelSchema[];
	private config: any;

	constructor(public _http: Http, private _storage: THFStorageService) {
	}

	prepare(schemas: THFModelSchema[], config?: any): Observable<any> {
		this.schemas = schemas;

		this.schemas.forEach(
			(item) => {
				this[item.name] = {};
			}
		);

		this.config = config;
		return Observable.of(null);
	}

	getOnePage(schema: THFModelSchema, page: number = 1): Observable<any> {
		let params = [];
		params.push('pageSize=' + schema.pageSize);
		params.push('page=' + page);
		let completeUrl = schema.urlApi + '?' + params.join('&');
		return this._http.get(completeUrl)
			.map((res) => {
				return res.json();
			})
			.flatMap((res) => {
				return this._storage.appendToArray(schema.name, res.items)
					.then(() => {
						return res;
					});
			});
	};

	loadData(): Observable<Array<{ entity: string, data: Array<any> }>> {
		let loads = [];
		this.schemas.forEach(
			(el) => loads.push(this.loadEntityData(el))
		);
		return Observable.forkJoin(loads);
	}

	loadEntityData(schema: THFModelSchema): Observable<{ entity: string, data: Array<any> }> {
		let page = 1;
		return this.getOnePage(schema, page)
			.expand(
			(data) => {
				let hasNext = data.hasNext;
				if (hasNext) {
					return this.getOnePage(schema, ++page);
				} else {
					return Observable.of();
				}
			})
			.reduce(
			(acc, obj) => {
				acc.data = acc.data.concat(obj.items);
				return acc;
			},
			{
				entity: schema.name,
				data: []
			}
			);
	}
}
