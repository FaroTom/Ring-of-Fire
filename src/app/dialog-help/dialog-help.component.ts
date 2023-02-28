import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-help',
  templateUrl: './dialog-help.component.html',
  styleUrls: ['./dialog-help.component.scss']
})
export class DialogHelpComponent {

  constructor(public dialogRef: MatDialogRef<DialogHelpComponent>) {

  }

  closeHelp(): void {
    this.dialogRef.close();
  }
}
