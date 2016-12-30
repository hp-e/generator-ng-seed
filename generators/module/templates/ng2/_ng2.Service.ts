import { Injectable } from "@angular/core";
import { Observable } from "rxjs/observable";
import { Headers, Http, Response, RequestOptions } from "@angular/http";
import { AppSettings } from "../app.settings";

import { <%= singularName %> } from "./<%= singularKebabName %>.models";

@Injectable()
export class <%= singularName %>Service {

    constructor(private http: Http, private settings: AppSettings){}

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: Response | any) {
        //TODO: Change this to remote logging
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ""} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error("SERVICE--ERROR:", errMsg);
        return Observable.throw(errMsg);
    }
}