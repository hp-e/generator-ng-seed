import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    //moduleId: module.id,
    selector: '<%= singularKebabName %>-index',
    templateUrl: '<%= singularKebabName %>.edit.page.html',
    styleUrls: ['<%= singularKebabName %>.edit.page.css']
})
export class <%= singularName %>EditPage implements OnInit, OnDestroy {
    constructor() { }

    ngOnInit() { }
    ngOnDestroy() { }
}