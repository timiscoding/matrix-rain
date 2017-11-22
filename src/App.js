import React, { Component } from 'react';
import Info from './components/Info';
import ControlContainer from './components/ControlContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { fullscreen: false, bench: false, play: true, info: true };

    this.onNewStats = this.onNewStats.bind(this);
    this.onControlChange = this.onControlChange.bind(this);
  }

  onNewStats(info) {
    const { sceneName, fps, frameCount, raindropCount } = info;
    const { state, frames } = info.bench;

    const benchData = [];
    for (let test in info.bench.stats) {
      const { average, min, max } = info.bench.stats[test];
      if (info.bench.stats.hasOwnProperty(test)) {
        benchData.push({ test, average, min, max });
      }
    }

    const stats = {
      basic: {
        data: [
          { name: 'Scene', value: sceneName },
          { name: 'FPS', value: fps },
          { name: 'Frame count', value: frameCount },
          { name: 'Raindrops', value: raindropCount },
        ],
      },
      bench: {
        state,
        frames,
        cols: [
          { key: 'test', label: '' },
          { key: 'average', label: 'Average' },
          { key: 'min', label: 'Min' },
          { key: 'max', label: 'Max' },
        ],
        data: benchData,
      },
    };
    this.setState({ stats });
  }

  onControlChange(trigger) {
    const toggles = ['fullscreen', 'info', 'bench', 'play'];
    const modes = ['rain', 'words', 'movie'];
    let newState;

    if (toggles.includes(trigger)) {
      newState = { [trigger]: !this.state[trigger] };
    } else if (modes.includes(trigger)) {
      newState = { mode: trigger };
    }

    this.setState({ ...newState, controlSketch: newState });
  }

  render() {
    const { fullscreen, bench, play, info, stats, mode, controlSketch } = this.state;
    const controls = { fullscreen, bench, play, info, mode };

    return (
      <div>
        <ControlContainer onNewStats={this.onNewStats} onControlChange={this.onControlChange} {...controls} controlSketch={controlSketch} />
        {info && stats && <Info stats={stats} />}
      </div>)
  }

};

export default App;
