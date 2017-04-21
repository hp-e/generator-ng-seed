import {Component, Input, OnInit, OnDestroy, OnChanges} from '@angular/core';
import { UserService } from '../../security/user.service';
import { AppSettings } from '../../app.settings';

@Component({
  selector: 'ga-developer-info',  
  templateUrl: './developer-info.component.html', 
  styles: [``]
})
export class DeveloperInfoComponent implements OnInit, OnDestroy, OnChanges {

  @Input() objects: any[] = [];

  @Input() showUserAccess: boolean = true;
  @Input() showAppSettings: boolean = false;

  enabled: boolean = false;

  constructor(
    private userService: UserService,
    private settings: AppSettings) { }
  
  ngOnInit() { 
    let session = sessionStorage.getItem("dev-info") === "true";
    
    this.enabled = (this.settings.enableDeveloperInfo || session );

  }


  ngOnDestroy() { }
  ngOnChanges() {}
}
