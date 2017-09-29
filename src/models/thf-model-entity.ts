import { ThfQueryBuilder } from './thf-query-builder';
import { THFStorageService } from "../providers/thf-storage/thf-storage";
import { THFModelSchema } from "./thf-model-schema";

export class THFModelEntity {

    constructor(private _storage: THFStorageService, private _schema: THFModelSchema) {
    }

    // findAll(page: number = 1, pageSize?: number, order?: string): Promise<{ hasNext: boolean, items: Array<any> }> {
    //     return this._storage.get(this._schema.name).then(
    //         (data: Array<any>) => {
    //             data = this.order(data, order);
    //             let paginated = this.paginate(data, page, pageSize);
    //             return {
    //                 hasNext: page < paginated.pages,
    //                 items: paginated.data
    //             };
    //         }
    //     )
    // };

    public save() {

    }

    public create(obj: any) {

    }

    public findOne(filter?: any, fields?: string) {
        let query = new ThfQueryBuilder(this._storage, this._schema);
        query.filter(filter)
        .limit(1)
        .select(fields);
        return query;
    }

    public find(filter?: any) {
        let query = new ThfQueryBuilder(this._storage, this._schema);
        query.filter(filter);
        return query;
    }
}