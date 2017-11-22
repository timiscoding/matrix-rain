import { font_size, updateFontSize, setP5Instance } from './classes/Globals';
import Matrix from './classes/Matrix';


export default (p) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  let m, mConfig;

  p.setup = () => {
    setP5Instance(p);
    // p.frameRate(10);
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.id("mycanvas");
    p.colorMode(p.HSB, 360, 100, 100, 100);
    p.textFont("monospace", font_size);
    p.textAlign(p.LEFT, p.TOP);

    m = new Matrix(mConfig);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
    p.reactProps = props;
    const trigger = props.controlSketch;
    mConfig = props.controlConfig;

    if (m) {
      if ('fullscreen' in trigger) {
        m.isFullscreen = trigger.fullscreen;
      } else if ('info' in trigger) {
        m.db.isEnabled = trigger.info;
      } else if ('play' in trigger) {
        m.isAnimating = trigger.play;
        m.animating ? p.loop() : p.noLoop();
      } else if ('bench' in trigger) {
        m.bench.isRunning = trigger.bench;

        if (trigger.bench === false) {
          m.bench.reset();
        }
      } else if ('mode' in trigger) {
        m = new Matrix({ ...mConfig, mode: trigger.mode });
      }
    }
  };

  p.windowResized = () => {
    updateFontSize(isMobile ? 15 : 20);
    p.textFont("monospace", font_size);

    let width, height;
    if (m.isFullscreen) {
      if (isMobile && window.matchMedia("(orientation: landscape)").matches) {
        width = p.displayHeight;
        height = p.displayWidth;
      } else {
        width = p.displayWidth;
        height = p.displayHeight;
      }
    } else {
      width = p.windowWidth;
      height = p.windowHeight;
    }
    p.resizeCanvas(width, height);

    m = new Matrix(mConfig);
  }

  p.draw = () => {
    const scene = m.scenes[m.sceneNum];
    if (scene) {
      scene.draw();
      if (scene.isDone) {
        m.sceneNum++;
      }
    } else {
      p.background(0);
    }

    if (m.db.isEnabled) {
      if (m.bench.isRunning) {
        m.bench.run();
      }
      m.db.info();
    }
  };
};
