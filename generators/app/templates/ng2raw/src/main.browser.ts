import './assets/styles.css';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';
import {enableProdMode} from '@angular/core';

// when the application is production ready, 
// uncomment the line below. This will activate 
// the production mode.
//enableProdMode();
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));