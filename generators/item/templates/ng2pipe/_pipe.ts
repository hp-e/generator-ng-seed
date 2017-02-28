import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: '<%= itemName %>'})
export class <%= className %><%= classPostfix %> implements PipeTransform {

    transform(value: any): any {
        // implement your code here

        return value;
    }
  
}