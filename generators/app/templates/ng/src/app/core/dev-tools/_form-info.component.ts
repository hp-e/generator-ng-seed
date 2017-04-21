import { Component, OnInit, OnDestroy, OnChanges, Input } from '@angular/core';
import { AppSettings } from "../../app.settings";
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'form-info',  
  templateUrl: './form-info.component.html', 
  styles: [``]
})
export class FormInfoComponent implements OnInit, OnDestroy, OnChanges {
  @Input() title: string = "Form";
  @Input() form: any;
  enabled: boolean = false;

  isReactiveForm: boolean;

  formValue: any = {};

  constructor(private settings: AppSettings) { }
  ngOnInit() { 

    this.isReactiveForm = this.form instanceof FormGroup;
    
    if (this.isReactiveForm) {
      this.formValue = this.form.value;
    }
    let session = sessionStorage.getItem("dev-info") === "true";
    
    this.enabled = (this.settings.enableDeveloperInfo || session );

  }

  ngOnDestroy() { }
  ngOnChanges() {}
}
