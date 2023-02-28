import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collectionData, collection, addDoc, docData, doc } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {
  constructor(private router: Router, private afs: AngularFirestore) {

  }

  newGame() {
    // start Game
    let game = new Game()
    
    this.afs.collection('games').add(game.toJson())
    .then((gameInfo: any) => {
      this.router.navigateByUrl('/game/' + gameInfo.id);
    })
  }
}
