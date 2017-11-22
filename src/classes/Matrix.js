import { p } from './Globals';
import Cloud from './Cloud';
import { Words, Rain, Title } from './Scenes';
import Benchmark from './Benchmark';
import DebugMatrix from './DebugMatrix';

export default class Matrix {
  constructor({ isFullscreen, bench, info, play, mode } = {}) {
    this.isFullscreen = isFullscreen;
    this.cloud = new Cloud();
    this.changeMode(mode);
    this.sceneNum = 0;

    this.bench = new Benchmark({ cloud: this.cloud, isRunning: bench });
    this.db = new DebugMatrix({ isEnabled: info, matrix: this });
    this.isAnimating = play;
  }

  get isAnimating() {
    return this.animating;
  }

  set isAnimating(val) {
    this.animating = val;
  }

  get isFullscreen() {
    return this.fullscreen;
  }

  set isFullscreen(val) {
    this.fullscreen = val;
    p.fullscreen(this.fullscreen);
  }

  changeMode(mode) {
    if (mode === 'rain') {
      this.scenes = [new Rain({ cloud: this.cloud })];
    } else if (mode === 'words') {
      this.scenes = [new Words({ cloud: this.cloud })];
    } else if (mode === 'movie') {
      this.scenes = [(new Rain({ cloud: this.cloud, time: 300 })), new Title({ cloud: this.cloud })];
    } else {
      this.scenes = [new Words({ cloud: this.cloud })];
    }
  }
}
