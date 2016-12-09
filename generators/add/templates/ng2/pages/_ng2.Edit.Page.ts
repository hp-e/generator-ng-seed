import { Component, OnInit } from '@angular/core';

@Component({
    //moduleId: module.id,
    selector: '<%= singularLowerName %>-index',
    templateUrl: '<%= singularName %>.Edit.Page.html',
    stylesUrl: ['<%= singularName %>.Edit.Page.css']
})
export class <%= singularName %>EditPage implements OnInit {
    constructor() { }

    ngOnInit() { }
}