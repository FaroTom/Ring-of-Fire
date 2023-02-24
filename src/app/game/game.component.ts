import { Component,OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collectionData, collection, addDoc, docData, doc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { updateDoc } from '@firebase/firestore';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game!: Game;
  gameCollection;
  gameId: string;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private firestore: Firestore) {
    this.gameCollection = collection(this.firestore, 'games');
  }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params: any) => {
      this.gameId = params.id;
      let selectedGame:any = doc(this.gameCollection, this.gameId)
      this.firestore.collection('games').doc(this.gameId).valueChanges()

      
    })
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if(!this.game.pickCardAnimation) {
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
      if(name && name.length > 0) {
        this.game.players.push(name)
        this.updateGame()
      }
    });
  }

  updateGame() {
   let currentGame = doc(this.gameCollection, this.gameId)
   console.log(currentGame)
   updateDoc(currentGame, this.game.toJson())
  }
}
