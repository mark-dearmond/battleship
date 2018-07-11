export class Location {
  isShip: boolean;
  hit: boolean;
  display: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}