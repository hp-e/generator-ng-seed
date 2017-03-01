import {Component} from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle("Hello from Home Component");
  }
}
