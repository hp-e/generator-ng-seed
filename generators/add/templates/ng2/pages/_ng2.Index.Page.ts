import { Component, OnInit } from '@angular/core';

@Component({
    //moduleId: module.id,
    selector: '<%= singularLowerName %>-index',
    templateUrl: '<%= singularName %>.Index.Page.html',
    stylesUrl: ['<%= singularName %>.Index.Page.css']
})
export class <%= singularName %>IndexPage implements OnInit {
    constructor() { }

    ngOnInit() { }
}