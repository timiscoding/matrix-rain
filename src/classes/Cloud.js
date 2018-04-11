import Raindrop from './Raindrop';
import { p, _, font_size, max_active_raindrops } from './Globals';

/* Cloud renders Raindrop instances across the window. By supplying text,
it can display phrases as long as the text can be shown within the window.
ie. font_size * text length < window width / font_size */

export default class Cloud {
  constructor(color) {
    this.raindrops = new Map();
    this.newRaindropTime = 0;
    this.curText = [];
    this.textColor = color;
    this.curTextOrder = []; // text falling from middle
    this.textOrder = []; // text falling into middle
    this.activeRaindrops = {};
  }

  static get size() {
    return p.floor(p.width / font_size);
  }

  setText(text, time, done) {
    this.text = text;
    this.textTime = time;
    this.textTimeDone = done || _.noop;
    this.textOrder = this.order(text);
    this.getMiddleLetter = _.zipObject(this.textOrder, this.text.split(''));

    let range;
    if (this.textOrder.length > this.curTextOrder.length) {
      range = this.getTextCols(this.textOrder.length);
    } else {
      range = this.getTextCols(this.curTextOrder.length);
    }
    const beforeText = _.range(0, range.start);
    const afterText = _.range(range.end, Cloud.size);
    this.outsideTextCols = beforeText.concat(afterText);
  };

  order(text) {
    const range = this.getTextCols(text.length);
    return _.range(range.start, range.start + text.length);
  };

  getTextCols(textLength) {
    if (!textLength) { return; }
    const start = p.floor((Cloud.size - textLength) / 2);
    return {
      start: start,
      end: start + textLength,
    };
  }

  addRaindrop(col) {
    if (!this.raindrops.get(col)) {
      this.activeRaindrops[col] = true;
      this.raindrops.set(col, new Raindrop({
        x: font_size * col,
        y: 0,
        died: this.removeRaindrop.bind(this, col),
        stopped: this.stoppedRaindrop.bind(this, col),
        color: this.textColor,
        middleLetter: _.get(this, ['getMiddleLetter', col]),
      }));
      return true;
    }
  }

  textTimer() {
    const curText = this.curText.join('');
    if (this.text && this.text === curText && this.textTime >= 0) {
      if (this.textTime === 0) {
        this.curTextOrder = this.order(this.text);
        this.textTimeDone();
      }
      this.textTime--;
    }
  }

  update() {
    this.textTimer();

    if (p.millis() > this.newRaindropTime) {
      if (this.raindrops.size < Cloud.size && Object.keys(this.activeRaindrops).length < max_active_raindrops) {
        const prob = { textOut: 0.4, textIn: 0.7 };
        const rand = _.random(true);

        if (this.curTextOrder.length === 0 && this.textOrder.length > 0) {
          prob.textOut = 0;
          prob.textIn = 0.5;
        } else if (this.curTextOrder.length === 0 && this.textOrder.length === 0) {
          prob.textOut = 0;
          prob.textIn = 0;
        }

        if (rand < prob.textOut) {
          if (this.curTextOrder.length > 0) {
            const index = _.random(this.curTextOrder.length - 1);
            const col = this.curTextOrder.splice(index, 1)[0];
            if (!this.textOrder.includes(col)) {
              this.outsideTextCols.push(col);
            }

            this.raindrops.get(col).middleLetter = '';
            this.curText[col] = null;
            this.activeRaindrops[col] = true;
          }
        } else if (rand < prob.textIn) {
          if (this.textOrder.length > 0) {
            // add new text only if raindrop doesn't exist
            const index = _.random(this.textOrder.length - 1);
            const col = this.textOrder[index];
            if (this.addRaindrop(col)) {
              this.textOrder.splice(index, 1);
            }
          }
        } else {
          let col = this.outsideTextCols
            ? _.sample(this.outsideTextCols)
            : _.random(Cloud.size - 1);
          this.addRaindrop(col);
        }
      }
      this.newRaindropTime = p.millis() + _.random(100, 300);
    }
  }

  display() {
    this.raindrops.forEach(raindrop => {
      raindrop.update();
      raindrop.display();
    });
  }

  removeRaindrop(col) {
    delete this.activeRaindrops[col];
    this.raindrops.delete(col);
  }

  stoppedRaindrop(col) {
    delete this.activeRaindrops[col];
    var middleLetter = this.getMiddleLetter[col];
    this.curText[col] = middleLetter;
  }
}
