/* This code is from React-p5-wrapper by NeroCor
https://github.com/NeroCor/react-p5-wrapper
*/
import React from 'react';
if (process.env.NODE_ENV === 'production') {
  var p5 = require('p5/lib/p5.min');
} else {
  /* using unminified slows down animation a lot
     so use p5.min.js if you want the animation to be fast.
     Unminified may still be helpful for debugging so leaving it
     on as default in dev build */
  var p5 = require('p5');
}

class P5Wrapper extends React.Component {

  componentDidMount() {
    this.canvas = new p5(this.props.sketch, this.wrapper);
    if( this.canvas.myCustomRedrawAccordingToNewPropsHandler ) {
      this.canvas.myCustomRedrawAccordingToNewPropsHandler(this.props);
    }
  }

  componentWillReceiveProps(newprops) {
    if(this.props.sketch !== newprops.sketch){
      this.wrapper.removeChild(this.wrapper.childNodes[0]);
      this.canvas = new p5(newprops.sketch, this.wrapper);
    }
    if(this.canvas.myCustomRedrawAccordingToNewPropsHandler ) {
      this.canvas.myCustomRedrawAccordingToNewPropsHandler(newprops);
    }
  }

  render() {
    return <div ref={wrapper => this.wrapper = wrapper}></div>;
  }
}

export default P5Wrapper;
