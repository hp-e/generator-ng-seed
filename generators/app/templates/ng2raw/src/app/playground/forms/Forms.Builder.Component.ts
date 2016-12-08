import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
    selector: 'avento-formbuilder',
    templateUrl: 'Forms.Builder.Component.html'
})
export class FormBuilderComponent implements OnInit {
    loginForm: FormGroup;
    username: FormControl;
    password: FormControl;

    constructor(private builder: FormBuilder) {

    }

    login() {
        console.log(this.loginForm.value);

    }
    ngOnInit() {
        this.username = new FormControl('', [
            Validators.required,
            Validators.minLength(5)
        ]);
        this.password = new FormControl('', [
            Validators.required,
            this.hasExclamationMark,
            this.hasPunctuation('&', 'ampersandRequired')
        ]);
        //this.password = new FormControl('', [Validators.required]);
        this.loginForm = this.builder.group({
            username: this.username,
            password: this.password
        });
    }

    hasExclamationMark(input: FormControl) {
        const hasExclamation = input.value.indexOf('!') >= 0;
        return hasExclamation ? null : { needsExclamation: true };
    }

    hasPunctuation(punctuation: string, errorType: string) {
        return function (input: FormControl) {
            return input.value.indexOf(punctuation) >= 0 ?
                null :
                { [errorType]: true };
        };
    }
}