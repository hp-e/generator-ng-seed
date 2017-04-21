import { Injectable } from '@angular/core';
import { IAppSettings } from './settings/app.settings.interface';

@Injectable()
export class AppSettings implements IAppSettings  {

    // baseUrl: string = 'http://localhost:32218';
    // = 'http://dev-api-mgadmin.gnistbarnehager.no';

    public baseUrl: string; 
    public apiUrl: string;
    public enableDeveloperInfo: boolean;

    public environment: string = process.env.NODE_ENV;


    constructor() {}

}