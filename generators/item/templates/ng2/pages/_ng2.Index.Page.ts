import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    //moduleId: module.id,
    selector: '<%= singularKebabName %>-index',
    templateUrl: '<%= singularKebabName %>.index.page.html',
    styleUrls: ['<%= singularKebabName %>.index.page.css']
})
export class <%= singularName %>IndexPage implements OnInit, OnDestroy {
    constructor() { }

    ngOnInit() { }
    ngOnDestroy() { }
}