import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// Add the RxJS Observable operators.
import '../../rxjs-operator';
import { CompanyService } from '../Company.Service';
import { CompanyListModel } from '../Company.Models';
@Component({
    //moduleId: module.id,
    selector: 'avento-add-company-widget',
    template: `
  <h4><i class="material-icons">add</i>Legg til bedrift</h4>
  <label>Navn: </label>  <input type="text" [(ngModel)]="company.companyName">

<label for="">Org.nr:</label> <input type="text" [(ngModel)]="company.orgNo">
<label for="">Adresse:</label> <input type="text" [(ngModel)]="company.address">
<button (click)=addCompany()>Legg til</button>
  `
})
export class AddCompanyWidget implements OnInit {
    @Output() onCreated = new EventEmitter<CompanyListModel>();

    company: CompanyListModel = <CompanyListModel>{};
    errorMessage: string;

    constructor(private companyService: CompanyService) { }

    ngOnInit(): void {

    }    

    public addCompany(): void {
        if (this.company.companyName) {
            this.companyService.addCompany(this.company)
                .subscribe(
                company => this.company = company,
                error => this.errorMessage = <any>error,
                () => {
                    this.onCreated.emit(this.company);
                    console.log("Add company", this.company);
                    this.company = <CompanyListModel>{};
                }

                );

        }

    }

}
