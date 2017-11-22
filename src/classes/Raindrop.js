import Symbol from './Symbol';
import { p, font_size } from './Globals';

/* Raindrop renders a vertical stream of Symbol instances at x, y. Optionally,
middleLetter will cause the raindrop to stop in the middle */

export default class Raindrop {
  constructor({ x, y, died, stopped, color, middleLetter }) {
    this.pos = p.createVector(x, y);
    this.symbols = new Map();
    this.addSymbol({ x, y });
    this.died = died || (() => { });
    this.middleLetter = middleLetter;
    this.stopped = stopped || (() => { });
    this.color = color;
    this.symbolCount = 0;
  }

  addSymbol({ x, y, symbol }) {
    const s = new Symbol({ x, y, symbol, died: this.removeSymbol.bind(this) });
    this.lowestSymbol = s;
    this.symbols.set(s, s);
    this.symbolCount += 1;
  }

  update() {
    this.pos.add(p.createVector(0, 4));

    const nextSymbolY = this.symbolCount * font_size;
    const trueMiddle = p.height / 2;
    const middle = p.floor(trueMiddle / font_size) * font_size;
    const { x, y } = this.pos;
    if (this.middleLetter) {
      if (y < middle && y > nextSymbolY) {
        this.addSymbol({ x, y: nextSymbolY });
      } else if (y >= middle && y > nextSymbolY) {
        this.addSymbol({ x, y: nextSymbolY, symbol: this.middleLetter });
        this.stopped();
      } else if (y >= middle) {
        this.pos.y = middle;
      }
    } else if (y < p.height + font_size && y > nextSymbolY) {
      this.addSymbol({ x, y: nextSymbolY });
    } else if (y > p.height && this.symbols.size === 1) {
      this.died();
    }
  }

  display() {
    this.symbols.forEach((symbol, i) => {
      const lowestSymbol = symbol === this.lowestSymbol;
      const lowestSymbolColor = this.color || p.color(0, 0, 100);

      symbol.update(lowestSymbol && lowestSymbolColor);
      symbol.display();
    });
  }

  removeSymbol(key) {
    this.symbols.delete(key);
  }
}
