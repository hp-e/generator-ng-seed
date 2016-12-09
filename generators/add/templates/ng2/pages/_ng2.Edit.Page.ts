import { Component, OnInit } from '@angular/core';

@Component({
    //moduleId: module.id,
    selector: '<%= singularKebabName %>-index',
    templateUrl: '<%= singularKebabName %>.Edit.Page.html',
    stylesUrl: ['<%= singularKebabName %>.Edit.Page.css']
})
export class <%= singularName %>EditPage implements OnInit {
    constructor() { }

    ngOnInit() { }
}