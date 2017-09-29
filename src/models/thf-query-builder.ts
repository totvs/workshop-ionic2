import { THFModelSchema } from './thf-model-schema';
import { THFStorageService } from './../providers/thf-storage/thf-storage';
export class THFQueryBuilder {

    private _filters: any;
    private _pageSize: number;
    private _fields: string;
    private _sort: string;
    private _page: number;
    private _limit: number;

    constructor(private _storage: THFStorageService, private _schema: THFModelSchema) {
        this._page = 1;
        this._pageSize = this._schema.pageSize;
        this._filters = {};
    }

    public select(fields): THFQueryBuilder {
        this._fields = fields;
        return this;
    }

    public limit(limit: number): THFQueryBuilder {
        this._limit = limit;
        return this;
    }

    public page(page: number): THFQueryBuilder {
        this._page = page;
        return this;
    }

    public pageSize(pageSize: number): THFQueryBuilder {
        this._pageSize = pageSize;
        return this;
    }

    public sort(sort: string): THFQueryBuilder {
        this._sort = sort;
        return this;
    }

    public filter(filter?: any) {
        if (filter) {
            if (typeof filter == 'object') {
                Object.keys(filter).forEach(
                    (item) => {
                        this._filters[item] = filter[item];
                    }
                )
            }
        }
        return this;
    }

    public where(): THFQueryBuilder {
        return this;
    }

    private paginate(data: Array<any>, page: number, pageSize?: number): { pages: number, data: Array<any> } {
        pageSize = pageSize || this._schema.pageSize;
        let dataLength = data.length;
        let pages = Math.ceil(dataLength / pageSize);
        let begin = (page * pageSize) - (pageSize);
        let end = begin + pageSize;
        return { pages: pages, data: data.slice(begin, end) };
    }

    private order(data: Array<any>, order?: string): Array<any> {
        if (!order) {
            return data;
        } else {
            let desc = order.startsWith("-") ? true : false;
            order = desc ? order.substr(1) : order;
            data = data.sort(
                (a, b) => {
                    if (desc) {
                        if (a[order] < b[order])
                            return 1;
                        if (a[order] > b[order])
                            return -1;
                    } else {
                        if (a[order] > b[order])
                            return 1;
                        if (a[order] < b[order])
                            return -1;
                    }
                    return 0;
                });
            return data;
        }
    }

    private applyFilters(data: Array<any>): Array<any> {
        Object.keys(this._filters).forEach(
            (item) => {
                data = data.filter(
                    (it) => {
                        return it[item] == this._filters[item];
                    }
                )
            }
        )

        return data;
    }

    private applyFields(data: Array<any>): Array<any> {
        var receivedFields = this._fields.split(" ");

        var restrictedFields = [];
        var selectedFields = [];
        receivedFields.forEach((element, index) => {
            if (element.startsWith("-"))
                restrictedFields.push(element.substring(1));
            else
                selectedFields.push(element);
        });

        

    }

    public exec(): any {
        return this._storage.get(this._schema.name).then(
            (data: Array<any>) => {
                if(this._fields)
                    data = this.applyFields(data);
                if (Object.keys(this._filters).length > 0)
                    data = this.applyFilters(data);
                if (this._sort)
                    data = this.order(data, this._sort);
                if (this._limit) {
                    return data[0];
                } else {
                    let paginated = this.paginate(data, this._page, this._pageSize);
                    return {
                        hasNext: this._page < paginated.pages,
                        items: paginated.data
                    };
                }
            }
        )
    }
}