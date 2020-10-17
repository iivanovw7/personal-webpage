/**
 * POSTCSS settings
 * @module styles/settings
 */
const defaults = {
  // Base font size in px
  fontSizePxBase: 14,

  bgColor: 'rgb(39,42,50)',
  defaultTextColor: 'azure',
  primaryColor: 'rgba(5, 16, 41, 1)',
  linkColor: '#d09175',
  operatorColor: '#529bd5',

  // Fonts related properties
  baseFontLocal: 'Inconsolata',
  baseFontFamily: '"Inconsolata", monospace, Fallback, sans-serif',
  baseFontLocalTtf: '../../fonts/Inconsolata-Regular.ttf',
  baseFontLocalOtf: '../../fonts/Inconsolata-Regular.otf',
  baseGoogleFont: 'https://fonts.googleapis.com/css?family=Inconsolata&display=swap',

  cursorLink: '../../img/cursor.png',

  // Font wights
  light: 100,
  regular: 400,
  bold: 600,

  // Adaptive font-size configuration
  adaptiveFonts: {
    baseSize: 10,

    // Value added to a current base font size
    addSize: '.3vw'
  },

  // Screen breakpoints in px
  breakpoints: {
    xs: 0,
    sm: 767,
    md: 928,
    lg: 1280,
    xl: 1920,
    xxl: 2560
  }
};

module.exports = {
  defaults
};
