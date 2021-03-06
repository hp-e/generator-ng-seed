import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';

@Injectable()
export class AppProdSettings extends AppSettings  {

    constructor() {
        super();
        console.log("** APP ENVIRONMENT: ", process.env.ENV, process.env.NODE_ENV);
        this.enableDeveloperInfo = false;
    }
}