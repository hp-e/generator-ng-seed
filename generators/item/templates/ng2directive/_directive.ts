import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({selector: '[<%= selectorName %>]'})
export class <%= fullClassName %> {

  constructor(private el: ElementRef) { }
  
}
