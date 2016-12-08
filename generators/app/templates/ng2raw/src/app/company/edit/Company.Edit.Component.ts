import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { CompanyService } from '../Company.Service';
import { CompanyListModel} from '../Company.Models';
import { PersonTableComponent} from '../../person/Person.Table.Component';

@Component({
  selector: 'avento-edit-company',
  templateUrl: 'Company.Edit.Component.html'
})
export class CompanyEditComponent implements OnDestroy, OnInit {
    private id: any;
    
    company:CompanyListModel = <CompanyListModel>{};
    
    
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private companyService: CompanyService)
        {

          
        }

    ngOnDestroy() {
    
  }

  ngOnInit() {
    
    console.log("Route Snap: ", this.route.snapshot);
    

    // Could use a snapshot here, as long as the parameters do not change.
    // This may happen when a component is re-used.
    //this.id = +this.route.snapshot.params['id'];

    this.route
      .params
      .map(params => params['id'])
      .do(id => this.id = +id)
      .subscribe(id => this.getCompany());
  }

  getCompany() {
      console.log("Current ID: ", this.id);
      
      if (this.id === 0 ) {return;}

      this.companyService.getCompany(this.id)
        .subscribe(company => this.company = company);

        console.log("current company: ", this.company);
        
  }

  save() {
    console.log("save company");
    if (this.id === 0 ) {return;}

      this.companyService.updateCompany(this.id, this.company)
        .subscribe(company => this.company = company);

        console.log("current company: ", this.company);
  }

}
