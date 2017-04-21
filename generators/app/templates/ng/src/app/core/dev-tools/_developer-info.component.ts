import {Component, Input, OnInit, OnDestroy, OnChanges} from '@angular/core';
import { AppSettings } from '../../app.settings';

@Component({
  selector: 'developer-info',  
  templateUrl: './developer-info.component.html', 
  styles: [``]
})
export class DeveloperInfoComponent implements OnInit, OnDestroy, OnChanges {

  @Input() objects: any[] = [];
  
  @Input() showAppSettings: boolean = false;

  enabled: boolean = false;

  constructor(private settings: AppSettings) { }
  
  ngOnInit() { 
    let session = sessionStorage.getItem("dev-info") === "true";    
    this.enabled = (this.settings.enableDeveloperInfo || session );

  }


  ngOnDestroy() { }
  ngOnChanges() {}
}
