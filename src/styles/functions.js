/**
 * POSTCSS functions
 * @module styles/functions
 */
const color = require('css-color-converter');

const helpers = require('./helpers');
const settings = require('./settings');

/**
 * Recalculates input in px to em according to context size || base font size
 * @param {string} pixels - amount of pixels to be recalculated
 * @param {string} context - context font size (or default from config)
 * @return {string} size in em
 */
const units = (pixels, context = settings.defaults.fontSizePxBase) => {
  const parsedPixels = parseFloat(pixels);
  const result = parsedPixels / context;

  return `${result}em`;
};

/**
 * Applies opacity value passed in params to color, by default uses black color and opacity 1
 * @param {string} value - color opacity to be changed
 * @param {string} frac - opacity value to be applied
 * @return {string} - returns color in hex string
 */
const opacify = (value = 'black', frac = '1') => {
  const rgba = color(helpers.isSettingsVariable(value)).toRgbaArray();
  return color([rgba[0], rgba[1], rgba[2], frac]).toHexString();
};

/**
 * Lightens input color according to frac passed in params
 * If variable passed - tries taking it out of settings list
 * @param {string} value - color value
 * @param {string} frac - amount to be used for lightening (default is 1 - no changes)
 * @return {string} - returns color in hex string
 */
const lighten = (value = 'black', frac = '1') => {
  const lightenFrac = parseFloat(frac);
  const rgba = color(helpers.isSettingsVariable(value)).toRgbaArray();

  const r = rgba[0] / lightenFrac;
  const g = rgba[1] / lightenFrac;
  const b = rgba[2] / lightenFrac;
  const a = rgba[3];

  return color([r, g, b, a]).toHexString();
};

module.exports = {
  units,
  opacify,
  lighten
};
