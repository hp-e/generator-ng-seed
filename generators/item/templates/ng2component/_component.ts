import {Component, OnInit, OnDestroy, OnChanges} from '@angular/core';

@Component({
  selector: '<%= prefix%><%= selectorName %>',  
  <% if (addTemplate) { %>templateUrl: './<%= templatePage %>', <% } else { %>template: [``], <% } %>
  <% if (addStyle) { %>styleUrls: ['./<%= stylePage %>']<% } else { %>styles: [``]<% } %>
})
export class <%= fullClassName %> implements OnInit, OnDestroy, OnChanges {

  constructor() { }
  ngOnInit() { }
  ngOnDestroy() { }
  ngOnChanges() {}
}
