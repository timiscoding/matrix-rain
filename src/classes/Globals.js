import _ from 'lodash';

let font_size = 20;
const updateFontSize = size => font_size = size;

let p;
const setP5Instance = pInstance => p = pInstance;

const max_active_raindrops = 40;

export { p, _, font_size, updateFontSize, setP5Instance, max_active_raindrops };
