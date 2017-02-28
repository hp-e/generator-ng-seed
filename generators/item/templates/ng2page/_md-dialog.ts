import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    templateUrl: './<%= pageName %>.dialog.html',
    <% if (addStyle) { %>styleUrls: ['./<%= stylePage %>'] <% } else { %>styles: [``] <% } %>
})
export class <%= className %>Dialog {

    title: string;

    constructor(public dialogRef: MdDialogRef<<%= className %>Dialog>) { }

    close(cancelled: boolean, returnItem: any) {
            
        let dialogResult = {
            cancelled: cancelled,
            item: returnItem
        };
        this.dialogRef.close(dialogResult);

    }

    cancel() {
        this.close(true, null);        
    }

/*
    Use this snippet in the calling class

    1) import the MdDialog and include the MdDialog in the constuctor
    import { MdDialog } from '@angular/material';

    2) create a method to open

    openDialog() {
        let dialogRef = this.dialog.open(ActivityDialog, {
            height: '500px',
            width: '800px',
            disableClose: false
        });
        
        dialogRef.componentInstance.title = "Dialog title";    

        dialogRef.afterClosed().subscribe(result => {
            
            console.log(result);    
                             
        });
    }
*/
}
