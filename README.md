# Matrix rain

This experiment recreates the opening scene from the movie [The Matrix](http://www.imdb.com/title/tt0133093/) and takes inspiration from the [Matrix digital rain wiki](https://en.wikipedia.org/wiki/Matrix_digital_rain). Animation done in [P5.js](https://p5js.org/) and GUI in [React](https://reactjs.org/).

## Demo

[Codepen demo](https://codepen.io/timiscoding/project/full/ZjNNOk/)

### Development build
To build it locally, run

```
npm i
npm start
```

then open `http://localhost:3000/` in the browser.

Note: There are performance issues in dev build because of the unminified p5 lib. This can be alleviated by using the minified version at the cost of less meaningful debugging messages. See [P5Wrapper.js](https://github.com/timiscoding/matrix-rain/blob/master/src/components/P5Wrapper.js)

###  Production build

```
npm i
npm run build
npm run serve
```

then navigate to the link provided.
## Evolution

This experiment began after completing the [Natural Simulations in Processing course](https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations) on Khan Academy. Originally I used the in-browser editor but I wanted to use ES6 so I moved onto codepen. [See attempt 1](https://www.khanacademy.org/computer-programming/matrix-digital-rain/5236099278110720)

At this time I discovered  P5.js, a modernised version of Processing.js built for the web and I decided to port over to it. It comes with numerous libraries, one of which is the P5 DOM library that lets your sketches interact with DOM elements. Sounded useful as I have a GUI that I wanted to bring outside actually rendering the animation.

The P5 DOM library is still in early experimental stages and unfortunately, I found it quite clunky to use. Creating elements is akin to the DOM API. Yuck. [See attempt 2](https://codepen.io/timiscoding/pen/RjgxoY)

Finally I looked into using React to render the GUI and found [React-p5-wrapper](https://github.com/NeroCor/react-p5-wrapper), a component that lets you pass props to sketches. [See attempt 3](https://codepen.io/timiscoding/project/editor/ZjNNOk)

As a free user, one of the annoying things with codepen projects is the 10 file limit, so I had to cram a whole bunch of classes in there which is why this repo exists. The sketch classes have beene moved into separate files and each React component has its own css file.
