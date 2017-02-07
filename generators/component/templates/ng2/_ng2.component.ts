import {Component, OnInit, OnDestroy, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: '<%= prefix%><%= pageName %>',  
  <% if (addTemplate) { %>templateUrl: './<%= fileName %>.html',<% } else { %>template: ``,<% } %>
  <% if (addStyle) { %>styleUrls: ['./<%= stylePage %>']<% } else { %>styles: [``]<% } %>
  
})
export class <%= className %><%= classPostfix %> implements OnInit, OnDestroy, OnChanges {

  constructor() { }
  ngOnInit() { }
  ngOnDestroy() { }
  ngOnChanges(changes: SimpleChanges) {}
}
