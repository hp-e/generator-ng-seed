import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'page-not-found',
  template: `
    <article class="template animated slideInRight">
      <h4>404 - Not Found!</h4>
      <div>This Url <strong>({{router.url}})</strong> does not exist</div>
    </article>
  `
})
export class PageNotFound {

  constructor(private router: Router) { }
}