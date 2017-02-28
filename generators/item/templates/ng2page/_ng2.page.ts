import {Component} from '@angular/core';

@Component({  
  templateUrl: './<%= pageName %>.page.html',
  <% if (addStyle) { %>styleUrls: ['./<%= stylePage %>']<% } else { %>styles: [``]<% } %>
})
export class <%= className %>Page {

  constructor() { }
}
