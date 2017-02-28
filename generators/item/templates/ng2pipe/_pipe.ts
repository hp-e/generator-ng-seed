import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: '<%= selectorName %>'})
export class <%= className %> implements PipeTransform {

    transform(value: any): any {
        // implement your code here

        return value;
    }
  
}