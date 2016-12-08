import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// Add the RxJS Observable operators.
import '../rxjs-operator';
import { PersonService } from './Person.Service';
import { Person } from './Person.Model';
import { AddPersonWidget} from './Person.Add.Widget';

@Component({
    //moduleId: module.id,
    selector: 'avento-person-table',
    // styles: [`
    //     .bg {
    //         background: #FFECB3;
    //         padding: 15px;
    //     }    
    // `],
    template: `
    <div class="bg">   

    <div class="widget" >
        <avento-add-person-widget (onCreated)="onCreated($event)" [companyId]="companyId">
        </avento-add-person-widget>
    </div>     
        
        
        <h3>Personer </h3>

        <table>
            <thead>
                <tr>
                    <td></td>
                    <td>#</td>
                    <td>Navn</td>
                    <td>Endret</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                <tr (click)="onSelect(person)" class="border" *ngFor="let person of persons">
                <td><i class="material-icons">person</i></td>
                    <td>{{person.id}}</td>
                    <td>{{person.firstName}} {{person.lastName}}</td>
                    <td>{{person.changedOn | date:'dd.MM.yyyy'}} </td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div *ngIf="selectedPerson && selectedPerson.id > 0" >
        <pre class="code">{{selectedPerson | json }}</pre>
    </div>
    `
})
export class PersonTableComponent implements OnInit {

    @Input() companyId: number;

    selectedPerson: Person;
    persons: Person[] = [];
    errorMessage: string;

    constructor(private personService: PersonService, private router: Router) { }

    ngOnInit(): void {
        console.log("On init for PersonTableComponent");
        this.getPersons();
    }

    public getPersons(): void {
        if (this.companyId > 0) {
            this.personService.getPersons(this.companyId)
                .subscribe(
                persons => this.persons = persons,
                error => this.errorMessage = <any>error
                );

            console.log("persons for id: " + this.companyId,  this.persons);
        } else {
            console.log("Could not get persons");
            
        }

    }

    onSelect(person: Person): void {
        this.selectedPerson = person;

    }

    onCreated(person:Person) : void {
        this.persons.push(person);
    }
}
