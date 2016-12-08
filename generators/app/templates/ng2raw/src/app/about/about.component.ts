import {Component} from '@angular/core';
import {AppSettings} from '../app.settings';
@Component({
  selector: 'about',
  styleUrls: ['./about.component.css'],
  templateUrl: './about.component.html'
})
export class AboutComponent {

  constructor(private settings:AppSettings) {
    
    
  }
}
