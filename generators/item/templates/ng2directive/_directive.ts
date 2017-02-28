import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({selector: '[<%= itemName %>]'})
export class <%= className %><%= classPostfix %> {

  constructor(private el: ElementRef) { }
  
}
