import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'avento-404',
  template: `
    <article class="template animated slideInRight">
      <h4>404 - Not Found!</h4>
      <div>Den url'en ({{router.url}}), eksisterer ikke</div>
    </article>
  `
})
export class PageNotFound {

  constructor(private router: Router) { }
}