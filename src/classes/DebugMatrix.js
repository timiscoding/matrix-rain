import { p, _ } from './Globals';

/* DebugMatrix provides utils for gathering info and debugging purposes */

export default class DebugMatrix {
  constructor({ isEnabled, matrix }) {
    this.isEnabled = isEnabled;
    this.infoMsg = "";
    this.textMargin = 5;
    this.fontSize = 15;
    this.font = "sans-serif";
    this.matrix = matrix;
  }

  get isEnabled() {
    return this.enabled;
  }

  set isEnabled(val) {
    this.enabled = val;
  }

  drawRects() {
    if (!this.isEnabled) return;

    p.push();
    p.rectMode(p.CENTER);
    p.stroke(0, 100, 100);
    p.fill(0, 0, 0, 0);

    for (var i = 0; i < 7; i++) {
      p.rect(p.width / 2, p.height / 2, 50 + i * 50, 50 + i * 50);
    }
    p.pop();
  }

  info() {
    if (p.frameCount % 5 !== 0) return;

    const scene = _.get(this, ['matrix', 'scenes', this.matrix.sceneNum]);
    const sceneName = _.get(scene, 'name');
    const raindropCount = Object.keys(this.matrix.cloud.activeRaindrops).length;

    const { state, frames, stats } = _.get(this, 'matrix.bench');
    p.reactProps.onNewStats({
      isEnabled: this.isEnabled,
      fps: p.floor(p.frameRate()),
      frameCount: p.frameCount,
      sceneName,
      raindropCount,
      bench: {
        state,
        frames,
        stats,
      },
    });
  }
}
