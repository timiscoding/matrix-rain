import _ from 'lodash';

let font_size = 20;
const updateFontSize = size => font_size = size;

let p;
const setP5Instance = pInstance => p = pInstance;

export { p, _, font_size, updateFontSize, setP5Instance };
