import {Component, OnInit, OnDestroy, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: '<%= pageName %>',
  styleUrls: ['./<%= pageName %>.component.css'],
  templateUrl: './<%= pageName %>.component.html'
})
export class <%= className %>Component implements OnInit, OnDestroy, OnChanges {

  constructor() { }
  ngOnInit() { }
  ngOnDestroy() { }
  ngOnChanges(changes: SimpleChanges) {}
}
