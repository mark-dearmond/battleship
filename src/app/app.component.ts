import { Component, OnInit } from '@angular/core';
import { Location } from './location';
import { Board } from './board';
import { Player } from './player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	playerId: number = 1;
	boardSize: number = 5;
	boards: Board[] = [];	
	setup: boolean = true;
	ships: number = 5;

	ngOnInit() {
		this.constructBoard();
	}

	constructBoard() {
  	let tiles = [];
  	for (var y = 0; y < this.boardSize; y++) {
  		tiles[y] = [];
  		for (var x = 0; x < this.boardSize; x++) {
  			tiles[y][x] = new Location({
  				isShip: false,
				  hit: false,
				  display: 'O'
  			})
  		}
  	}

  	let board = new Board({
  		id: this.playerId,
  		player: new Player({ id: this.playerId }),
  		tiles: tiles
  	})

  	if(board.player.id > 1) {
  		tiles = this.setRandomShips(tiles);
  	}

  	this.boards.push(board);
  }

  startGame() {
  	this.setup = false;
  	this.playerId++;
  	this.constructBoard();
  	this.playerId = 1;
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	setRandomShips(tiles) {
		let shipCount = 0;
		tiles.forEach((y) => {
			y[this.getRandomNumber(0,4)].isShip = true;
		})
		return tiles;
	}
  
  action(board, x) {
  	if(!this.setup && (board.id != this.playerId)) {
  		this.fire(board, x);
  	} else {
  		this.addShip(x);
  	}
  }

  addShip(x) {
  	if(this.ships == 0) {
  		return;
  	}

  	x.isShip = true;
		this.ships--;

		if(this.ships == 0) {
			this.startGame();
		}
  }

  fire(board, x) {
  	if(x.isShip) {
  		x.display = 'H';
  	} else {
  		x.display = 'M';
  	}
  	if(this.playerId == 1) {
  		this.playerId++;
  	} else {
  		this.playerId--;
  	}
  }
}
