import { CompanyListModel } from './Company.Models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
//import '../../rxjs-operators';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import {AppSettings} from '../app.settings';

@Injectable()
export class CompanyService {

    constructor(private http: Http, private settings : AppSettings) {

    }

    public getCompanies(): Observable<CompanyListModel[]> {
        console.log("CompanyService.getCompanies");
        
        let url = `${this.settings.apiUrl}/companies`;

        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public getCompany(companyId:number): Observable<CompanyListModel> {
        console.log(`CompanyService.getCompany(${companyId})`);
        
        let url = `${this.settings.apiUrl}/companies/${companyId}`;
        console.log(url);
        
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);

    }

    public updateCompany(companyId:number, companyItem:CompanyListModel) : Observable<CompanyListModel>{
        console.log(`CompanyService.getCompany(${companyId})`);
        
        let url = `${this.settings.apiUrl}/companies/${companyId}`;
        console.log(url);
        
        return this.http.put(url, companyItem)
            .map(this.extractData)
            .catch(this.handleError);

    }

public addCompany(companyItem:CompanyListModel) : Observable<CompanyListModel>{
        console.log(`CompanyService.addCompany()`);
        
        let url = `${this.settings.apiUrl}/companies`;
        console.log(url);
        
        return this.http.post(url, companyItem)
            .map(this.extractData)
            .catch(this.handleError);

    }


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
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error("SERVICE--ERROR:", errMsg);
        return Observable.throw(errMsg);
    }
}