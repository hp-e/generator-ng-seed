import { Person } from './Person.Model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
//import '../../rxjs-operators';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import {AppSettings} from '../app.settings';

@Injectable()
export class PersonService {

    constructor(private http: Http, private settings : AppSettings) {

    }

    public getPersons(companyId:number): Observable<Person[]> {
        console.log("PersonService.getPersons for id: " + companyId);
        
        let url = `${this.settings.apiUrl}/companies/${companyId}/persons`;
        console.log(url);
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }
    
    public addPerson(person:Person): Observable<Person> {
        console.log("PersonService.addPerson: " );
        person.changedBy = "angular2-app";
        let url = `${this.settings.apiUrl}/persons`;
        console.log(url);
        return this.http.post(url, person)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {        
        let body = res.json();
        return body || {};
    }

    private handleError(error: Response | any) {
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