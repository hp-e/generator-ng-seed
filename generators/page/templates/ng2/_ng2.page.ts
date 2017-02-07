import {Component} from '@angular/core';

@Component({
  selector: '<%= pageName %>-page',  
  templateUrl: './<%= pageName %>.page.html',
  <% if (addStyle) { %>styleUrls: ['./<%= stylePage %>']<% } else { %>styles: [``]<% } %>
})
export class <%= className %>Page {

  constructor() { }
}
