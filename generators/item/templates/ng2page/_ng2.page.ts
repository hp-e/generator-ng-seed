import {Component} from '@angular/core';

@Component({    
  <% if (addTemplate) { %>templateUrl: './<%= templatePage %>', <% } else { %>template: [``], <% } %>
  <% if (addStyle) { %>styleUrls: ['./<%= stylePage %>']<% } else { %>styles: [``]<% } %>
})
export class <%= fullClassName %> {

  constructor() { }
}
