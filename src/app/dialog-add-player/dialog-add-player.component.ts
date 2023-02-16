import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent {
  name = '';

  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
