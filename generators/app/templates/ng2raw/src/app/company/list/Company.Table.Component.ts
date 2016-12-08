import { Component, OnInit, Input }         from '@angular/core';
import { Router }   from '@angular/router';

// Add the RxJS Observable operators.
import '../../rxjs-operator';
import {CompanyService} from '../Company.Service';
import {CompanyListModel} from '../Company.Models';
import { AppSettings} from '../../app.settings';
import { AddCompanyWidget } from '../widgets/Company.Add.Component';
// import { PersonTableComponent } from '../../person/Person.Table.Component';
// import { PersonService } from '../person/Person.Service';

@Component({
    //moduleId: module.id,
  selector: 'avento-company-table',
  templateUrl: 'Company.Table.Component.html',  
  styleUrls: ['Company.Table.Component.css']  
})
export class CompanyListComponent implements OnInit { 

    selectedCompany: CompanyListModel;
    companies: CompanyListModel[] = [];
    errorMessage: string;

    constructor(private companyService : CompanyService, private router: Router, private settings:AppSettings) { }

    ngOnInit() : void {
        console.log("On init for CompanyListComponent");
        this.getCompanies();
    }

    public getCompanies() : void {        
        this.companyService.getCompanies()
            .subscribe(
                companies => this.companies = companies,
                error => this.errorMessage = <any>error
            );

        console.log(this.companies);
        
    }

    onSelect(company:CompanyListModel) : void {
        this.selectedCompany = company;
        
    }

    gotoDetail(): void {

    this.router.navigate(['/companies/', this.selectedCompany.id]);
  }

  gotoDepartments(): void {
      var link = '';
    this.router.navigate(['/companies/', this.selectedCompany.id,"departments"]);
  }

  onCreated(company:CompanyListModel) : void {
      this.companies.push(company);
  }
}
