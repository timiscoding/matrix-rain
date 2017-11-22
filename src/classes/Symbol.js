import { p, _ } from './Globals';

/* Symbol renders a single character at x, y position that fades from green to black.
In the case where 'newColor' is supplied to update(), it will never change color */

const charList = (charCode, n) => String.fromCharCode(..._.range(charCode, charCode + n));
const unicodeA = 65;
const unicode0 = 48;
const unicodeKa = 65398;
const alphabet = charList(unicodeA, 26);
const numbers = charList(unicode0, 10);
const katakana = charList(unicodeKa, 32);
const SYMBOLS = ['*', '+', '<', '>', ...alphabet, ...numbers, ...katakana];

class Symbol {
  constructor({ x, y, symbol, died }) {
    this.pos = p.createVector(x, y);
    this.color = p.color(360, 100, 100);
    this.life = 100;
    this.symbol = symbol || _.sample(SYMBOLS);
    this.died = died || (() => { });
  }

  update(newColor) {
    if (newColor) {
      this.color = newColor;
    } else {
      if (this.life <= 0) {
        this.died(this);
        return;
      } else if (this.life > 50) {
        this.life -= 0.5;
      } else {
        this.life -= 1;
      }

      if (this.life % 20 === 0 && _.random(true) > 0.9) {
        this.symbol = _.sample(SYMBOLS);
      }
      this.color = p.color(105, 100, this.life);
    }
  }

  display() {
    p.fill(this.color);
    p.text(this.symbol, this.pos.x, this.pos.y);
  }
}

export default Symbol;
