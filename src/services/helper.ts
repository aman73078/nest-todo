export class ResponseData<T> {
    status:boolean;
    message:string;
    data:T;

    constructor(status:boolean = true, message:string = '', data:T = null as T){
        this.data = data;
        this.message = message;
        this.status = status;
    }
}

export class Result<T> {
    message:string;
    data:T;

    constructor(message:string = '', data:T = null as T){
        this.message = message;
        this.data = data;
    }
}