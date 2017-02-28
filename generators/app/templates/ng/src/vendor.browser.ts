// Angular 2
import '@angular/platform-browser-dynamic';
import '@angular/platform-browser';
import '@angular/core';
import '@angular/http';
import '@angular/router';


// RxJS 5
// import 'rxjs/Rx';
//-------------------------------------------------------------------
// these are imports based on selection from the generator
<% if (addFontAwesome === true) { %>
// import files for Font Awesome;
import "font-awesome/css/font-awesome.css";
<% } %>
<% if (addLodash === true) { %>
// import files for Font Awesome;
// keep in mind that lodash is a large library and you can import
// just the parts you need. If you only need to use the map function
// import "lodash/map"
import "lodash";
<% } %>
<% if (front === 'mdl') { %>
// import files for Material Design Lite;
import "material-design-lite/material.js";
import "material-design-lite/material.css";
import "material-design-lite/dist/material.blue-green.min.css";
<% } %>
<% if (front === 'md2') { %>
// import dependency files for Angular Material 2;
// the material library is imported in src/app/app.module.ts
// keep in mind that Angular Material is still in Alpha and you should
// avoid using it a production application. If you want Material Design in
// the project you can use Material Design Lite
import "hammerJs";
<% } %>
<% if (front === 'bs3') { %>
// import files for Bootstrap v3;
import "bootstrap";
<% } %>
<% if (front === 'bs4') { %>
// import files for Bootstrap v4;
// keep in mind that lodash is a large library and you can import
// just the parts you need. If you only need to use the map function
// import "lodash/map"
import "lodash";
<% } %>

<% if (addHighchart === true) { %>
// import files for highcharts;
// in the src/app/app.module.ts a package called 'angular2-highcharts' is imported
// this package is a ng2 wrapper for the highcharts
import "highcharts";
<% } %>
// -------------------------------------------------------------------
// for other vendors for example jQuery, Lodash, angular2-jwt import them here
// also see src/typings.d.ts as you also need to run `typings install x` where `x` is your module