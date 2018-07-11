import { Location } from './location';
export class Board {
  tiles: Object[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
