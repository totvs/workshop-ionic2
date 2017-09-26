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
import 'rxjs/add/observable/fromPromise';
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
				// this[item.name].tests = this.tests;
			}
		);

		this.config = config;
		return Observable.of(null);
	}

	loadData(): Observable<Array<{ entity: string, data: Array<any> }>> {
		let loads = [];
		this.schemas.forEach(
			(el) => loads.push(this.loadEntityData(el))
		);
		return Observable.forkJoin(loads);
	}

	loadEntityData(schema: THFModelSchema): Observable<{ entity: string, data: Array<any> }> {
		const getPage = (url: string, entity: string, page: number = 1): Observable<Response> => {
			let params = [];
			params.push('pageSize=' + schema.pageSize);
			params.push('page=' + page);
			let completeUrl = url + '?' + params.join('&');
			return this._http.get(completeUrl);
		};
		let page = 1;
		return getPage(schema.urlApi, schema.name, page)
			.expand(
			(res) => {
				let data = res.json();
				let hasNext = data.hasNext;
				if (hasNext) {
					return getPage(schema.urlApi, schema.name, ++page);
				} else {
					return Observable.of();
				}
			})
			.flatMap((res) => {
				console.log("Entidade: " + schema.name + " dados: " + res.json().items.length);
				return this._storage.appendToArray(schema.name, res.json().items).map(
					() => {
						return res;
					})
			})
			.reduce(
			(acc, obj) => {
				acc.data = acc.data.concat(obj.json().items);
				return acc;
			},
			{
				entity: schema.name,
				data: []
			}
			);
	}
}
