import { Component, OnInit } from '@angular/core';

@Component({
    //moduleId: module.id,
    selector: '<%= singularKebabName %>-index',
    templateUrl: '<%= singularKebabName %>.index.page.html',
    stylesUrl: ['<%= singularKebabName %>.index.page.css']
})
export class <%= singularName %>IndexPage implements OnInit {
    constructor() { }

    ngOnInit() { }
}