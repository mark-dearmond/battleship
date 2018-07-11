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
	winner: number;
	message: string = 'Click the board to set your ships.';

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
  	this.message = 'Click your opponents squares to fire.'
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	setRandomShips(tiles) {
		let shipCount = 0;
    let y, x;
    while (shipCount < 5) {
      y = this.getRandomNumber(0,4);
      x = this.getRandomNumber(0,4);
      if(!tiles[y][x].isShip) {
        tiles[y][x].isShip = true;
        shipCount++;
      }
    }
		return tiles;
	}
  
  action(board, x) {
  	if(!this.setup && (board.id != this.playerId) && !this.winner) {
  		this.fire(x, board);
  	} else {
  		this.addShip(x);
  	}
  }

  addShip(x) {
  	if(this.ships == 0) {
  		return;
  	}

  	if(!x.isShip) {
  		x.isShip = true;
			this.ships--;
  	} else {
  		return;
  	}

		if(this.ships == 0) {
			this.startGame();
		}
  }

  fire(x, board) {
  	if(x.isShip && x.display == 'O') {
  		x.display = 'H';
  		x.hit = true;
  		console.log('Player ' + this.playerId + ' hit.');
  	} else if (!x.isShip && x.display == 'O') {
  		x.display = 'M';
  		console.log('Player ' + this.playerId + ' missed.');
  	} else if (x.diplay != 'O') {
  		console.log('Already taken');
  		return;
  	}

  	// this.message = 'Click your opponents squares to fire.'

  	if(this.checkVictory(board.tiles) == 5) {
  		this.winner = this.playerId;
  		this.message = 'Player ' + this.winner + ' wins!';
  	}

  	if(this.playerId == 1) {
  		this.playerId++;
  		this.computerPlay();
  	} else {
  		this.playerId--;
  	}
  }

  checkVictory(tiles) {
  	let hits = 0
  	tiles.forEach((y) => {
  		y.forEach((x) => {
  			if(x.hit) {
  				hits++
  			}
  		})
  	})
  	return hits;
  }

  computerPlay() {
  	let isValid = false;

  	while(!isValid) {
  		let y = this.getRandomNumber(0,4);
	  	let x = this.getRandomNumber(0,4);
	  	let tile = this.boards[0].tiles[x][y];
  		if(tile.display == 'O') {
  			this.fire(tile, this.boards[0]);
  			isValid = true;
  		}
  	}
  }

  replay() {
  	location.reload();
  }
}
