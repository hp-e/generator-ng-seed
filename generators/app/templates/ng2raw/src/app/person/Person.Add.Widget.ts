import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';
// Add the RxJS Observable operators.
import '../rxjs-operator';
import { PersonService } from './Person.Service';
import { Person } from './Person.Model';

@Component({
    //moduleId: module.id,
    selector: 'avento-add-person-widget',
    template: `
    <h4>
        Legg til person <i class="material-icons">person_add</i>
    </h4>

    <label>Fornavn: </label>  
    <input type="text" [(ngModel)]="person.firstName">
    
    <label for="">Lastname:</label> 
    <input type="text" [(ngModel)]="person.lastName">

    <button (click)="addPerson()">Legg til</button>
  `
})
export class AddPersonWidget implements OnInit {
    
    @Input() companyId : number;
    @Output() onCreated = new EventEmitter<Person>();

    person: Person = <Person>{};
    errorMessage: string;

    constructor(private personService: PersonService) { }

    ngOnInit(): void {

    }    

    addPerson(): void {
        console.log("addPerson", this.person.firstName, this.companyId);
        
        if (this.person.firstName && this.companyId > 0) {
            this.person.companyId = this.companyId;            
            this.personService.addPerson(this.person)
                .subscribe(
                person => this.person = person,
                error => this.errorMessage = <any>error,
                () => {
                    this.onCreated.emit(this.person);
                    console.log("Add Person", this.person);
                    this.person = <Person>{};
                }

                );

        }

    }

}
