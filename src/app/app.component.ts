import { Component, OnInit } from '@angular/core';
import { Location } from './location';
import { Board } from './board';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	playerId: number = 1;
	boardSize: number = 5;
	board: Board;	

	ngOnInit() {
		this.constructBoard();
	}

	constructBoard() {
  	let tiles = [];
  	let isShip = false;
  	let shipCount = 0;
  	for (var y = 0; y < this.boardSize; y++) {
  		tiles[y] = [];
  		for (var x = 0; x < this.boardSize; x++) {
  			if(shipCount < 5) {
  				let randomNum = this.getRandomNumber(1, 5);
	  			if(randomNum == 3) {
	  				isShip = true;
	  				shipCount++;
	  			}
  			}
  			tiles[y][x] = new Location({
  				isShip: isShip,
				  hit: false,
				  display: 'O'
  			})
  			isShip = false;
  		}
  	}

  	// this.setRandomShips(tiles);

  	this.board = new Board({
  		tiles: tiles
  	})

  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	// setRandomShips(tiles) {
	// 	let shipCount = 0
	// }
  
  fire(x) {
  	if(x.isShip) {
  		x.display = 'H';
  	} else {
  		x.display = 'M';
  	}
  }
}
