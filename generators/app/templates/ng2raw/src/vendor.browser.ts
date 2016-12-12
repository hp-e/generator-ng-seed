

//require('./styles.css')
// Angular 2
import '@angular/platform-browser-dynamic';
import '@angular/platform-browser';
import '@angular/core';
import '@angular/http';
import '@angular/router';


// RxJS 5
// import 'rxjs/Rx';
//-------------------------------------------------------------------
//these are imports based on selection from the generator
<% if (addFontAwesome === true) { %>
//import files for Font Awesome;
import "font-awesome/css/font-awesome.css";
<% } %>
<% if (addLodash === true) { %>
//import files for Font Awesome;
// Keep in mind that lodash is a large library and you can import
// just the parts you need. If you only need to use the map function
// import "lodash/map"
import "lodash";
<% } %>
<% if (front === 'mdl') { %>
//import files for Material Design Lite;
import "material-design-lite/material.js";
import "material-design-lite/material.css";
<% } %>
<% if (front === 'md2') { %>
//import files for Angular Material 2;
// Keep in mind that Angular Material is still in Alpha and you should
// use this in a production application. If you want Material Design in
// the project you can use Material Design Lite
import "@material/misc";
<% } %>
<% if (front === 'bs3') { %>
//import files for Bootstrap v3;
import "bootstrap";
<% } %>
<% if (front === 'bs4') { %>
//import files for Bootstrap v4;
// Keep in mind that lodash is a large library and you can import
// just the parts you need. If you only need to use the map function
// import "lodash/map"
import "lodash";
<% } %>
//-------------------------------------------------------------------
// For other vendors for example jQuery, Lodash, angular2-jwt import them here
// Also see src/typings.d.ts as you also need to run `typings install x` where `x` is your module