import { p } from './Globals';

/* Benchmark measures fps, raindrop and symbol counts for analysing performance */

export default class Benchmark {
  constructor({ cloud, isRunning }) {
    this.isRunning = isRunning;
    this.frames = 1000;
    this.sampleRate = 30;
    this.stats = this.clearStats();
    this.state = "IDLE";
    this.cloud = cloud;
  }

  get isRunning() {
    return this.running;
  }

  set isRunning(val) {
    this.running = val;
  }

  clearStats() {
    return {
      fps: { data: [] },
      raindrops: { data: [] },
      symbols: { data: [] },
    };
  }

  reset() {
    this.frames = 1000;
    this.stats = this.clearStats();
    this.state = "IDLE";
  }

  run() {
    const minMax = (val, stat) => {
      const { min, max } = stat;

      if (min === undefined || val < min) {
        stat.min = val;
      }

      if (max === undefined || val > max) {
        stat.max = val;
      }
    };

    const average = (data) => {
      const sum = data.reduce((sum, val) => sum += val);
      return (sum / data.length).toFixed(2);
    };

    this.frames--;

    if (this.frames > 0) {
      this.state = "RUNNING";
      if (this.frames % this.sampleRate !== 0) return;

      const fps = parseInt(p.frameRate(), 10);
      this.stats.fps.data.push(fps);
      minMax(fps, this.stats.fps);

      const raindropCount = this.cloud.raindrops.size;
      this.stats.raindrops.data.push(raindropCount);
      minMax(raindropCount, this.stats.raindrops);

      let symbolCount = 0;
      this.cloud.raindrops.forEach(raindrop => symbolCount += raindrop.symbols.size);
      this.stats.symbols.data.push(symbolCount);
      minMax(symbolCount, this.stats.symbols);
    } else if (this.frames === 0) {
      this.state = "DONE";
      this.stats.fps.average = average(this.stats.fps.data);
      this.stats.raindrops.average = average(this.stats.raindrops.data);
      this.stats.symbols.average = average(this.stats.symbols.data);
    }
  }
}
