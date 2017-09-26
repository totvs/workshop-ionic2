export class THFModelSchema  {
    urlApi: string;
    name: string;
    fields: string[];
    pageSize: number
    constructor(schema: any) {
        this.name = schema.name;
        this.urlApi = schema.urlApi;
        this.fields = schema.fields;
        this.pageSize = schema.pageSize;
    }
    
}