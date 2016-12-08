import './assets/styles.css';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';
import {enableProdMode} from '@angular/core';

//Hvis dette skal kjøres i produksjon så kommenter ut neste linje
//enableProdMode();
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));