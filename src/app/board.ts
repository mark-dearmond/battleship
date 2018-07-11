import { Location } from './location';
import { Player } from './player';
export class Board {
	id: number;
	player: Player;
  tiles: Object[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
