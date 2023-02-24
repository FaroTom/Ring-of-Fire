import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collectionData, collection, addDoc, docData, doc } from '@angular/fire/firestore';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {
  constructor(private router: Router, private firestore: Firestore) {

  }

  newGame() {
    // start Game
    let game = new Game()
    addDoc(collection(this.firestore, 'games'), game.toJson()).then((gameInfo) => {
      this.router.navigateByUrl('/game/' + gameInfo.id);
    })
  }
}
