import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collectionData, collection, addDoc, docData, doc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { updateDoc } from '@firebase/firestore';
import { DialogHelpComponent } from '../dialog-help/dialog-help.component';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game!: Game;
  gameId: string;
  gameOver = false;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private afs: AngularFirestore) {

  }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params: any) => {
      this.gameId = params.id;
      this.afs
        .collection('games')
        .doc(this.gameId)
        .valueChanges()
        .subscribe((game: any) => {
          this.game.currentCard = game.currentCard;
          this.game.players = game.players;
          this.game.player_images = game.player_images;
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCards = game.playedCards;
          this.game.stack = game.stack;
        })
    })
    setTimeout(() => {
      this.checkPlayerCount();
    }, 1200)
  }

  newGame() {
    this.game = new Game();
  }

  checkPlayerCount() {
    if (this.game) {
      let playerCount = this.game.players.length;
      if (playerCount == 0) {
        this.openDialog();
      }
    }
  }

  editPlayer(playerID) {
    const dialogRef = this.dialog.open(EditPlayerComponent);

    dialogRef.afterClosed().subscribe((change: string) => {
      if(change) {
        if(change == 'DELETE') {
          this.game.players.splice(playerID, 1);
          this.game.player_images.splice(playerID, 1);
        } else {
          this.game.player_images[playerID] = change;
        }
      } 
      this.updateGame();
      }
    );
  }

  takeCard() {
    if(this.game.stack.length == 0) {
      this.gameOver = true;
    }
    else if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop()
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.updateGame()
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard)
        this.game.pickCardAnimation = false;
        this.updateGame()
      }, 1250)
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name)
        this.game.player_images.push('1.webp')
        this.updateGame()
      }
    });
  }

  openHelp(): void {
    const dialogRef = this.dialog.open(DialogHelpComponent);
  }

  updateGame() {
    this.afs
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJson());
  }
}
