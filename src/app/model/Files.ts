export class Files {
    code: number;
    type: string;
    name: string;
    url: string;
    date: Date;
    constructor();
    constructor(code: number, type: string, name: string, url: string, date: Date);
    constructor(code?: number, type?: string, name?: string, url?: string, date?: Date) {
        this.code = code;
        this.type = type;
        this.name = name;
        this.url = url;
        this.date = date;
    }
}