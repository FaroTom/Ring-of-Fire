import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameComponent } from '../game/game.component';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent {
  name = '';
  game;


  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>, private gameComp: GameComponent) {

  }

  ngOnInit() {
    this.game = this.gameComp.game;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
