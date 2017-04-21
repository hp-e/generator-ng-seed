
import "./assets/styles.css";
<% if ( front==='md2') { %>import "./assets/main-theme.scss"; <% } %>
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./app/app.module";
import {enableProdMode} from "@angular/core";

if (process.env.NODE_ENV !== 'local' ) {
  console.log("ENABLE PROD MODE");
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));