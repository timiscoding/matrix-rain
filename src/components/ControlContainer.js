import React from 'react';
import P5Wrapper from './P5Wrapper';
import Control from './Control';

import sketch from '../sketch';

class ControlContainer extends React.Component {
  shouldComponentUpdate(nextProps) {
    const [c, n] = [this.props, nextProps];
    return c.fullscreen !== n.fullscreen ||
      c.info !== n.info ||
      c.bench !== n.bench ||
      c.play !== n.play ||
      c.mode !== n.mode;
  }

  render() {
    const { fullscreen, bench, info, play, onNewStats, onControlChange, mode, controlSketch } = this.props;
    const controlConfig = { fullscreen, bench, info, play, mode };

    return (
      <div>
        <P5Wrapper sketch={sketch} onNewStats={onNewStats} controlSketch={controlSketch} controlConfig={controlConfig} />
        <Control fullscreen={fullscreen} info={info} bench={bench} play={play} onControlChange={onControlChange} />
      </div>)
  }
};

export default ControlContainer;
