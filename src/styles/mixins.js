/**
 * POSTCSS mixins
 * @module styles/mixins
 * @author Ivanov Igor
 */
const settings = require('./settings');

// Destructuring Config
const { defaults } = settings;
const { adaptiveFonts, breakpoints } = defaults;

/**
 * Adds adaptive styles to font sizes for small screens, (width below mid break point)
 * @return {Object} mixin
 */
const fonts = () => ({
  [`@media only screen and (max-width: ${breakpoints.md}px)`]: {
    'font-size': `calc(${adaptiveFonts.baseSize}px + ${adaptiveFonts.addSize})`
  },
  [`@media only screen and (min-width: ${breakpoints.md}px)`]: {
    'font-size': `${defaults.fontSizePxBase}px`
  }
});

/**
 * Mixin is used for adding shadow styles of different sizes
 * @param {Object} mixin - mixin node
 * @param {string} type - shadow descriptor
 * @return {{"box-shadow": string}} - returns mixin content
 */
const shadows = (mixin, type = 'xs') => {
  switch (type) {
    case 'xs':
      return { 'box-shadow': '0 2px 4px 0 rgba(0,0,0,0.10)' };
    case 'md':
      return { 'box-shadow': '0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08)' };
    case 'lg':
      return { 'box-shadow': '0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)' };
    case 'photo':
      return { 'box-shadow': '0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.8)' };
    default:
      return { 'box-shadow': '0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08)' };
  }
};

/**
 * Returns media query with provided min&max breakpoint values
 * breakpoints are taken from settings, in case invalid key is provided -
 * returns mixin with `default` breakpoint
 *
 * @param {Object} mixin - parent node
 * @param {string} min - min-width breakpoint key
 * @param {string} max - max-width breakpoint key
 * @return {Object} mixin
 */
const media = (mixin, min = 'xs', max) => {
  const breakpointKeys = Object.keys(breakpoints);
  const setBreakpoint = (value) => (breakpointKeys.includes(value) ? breakpoints[value] : breakpoints.xs);
  const minWidthQuery = `@media only screen and (min-width: ${setBreakpoint(min)}px)`;

  // prettier-ignore
  const mediaQuery = (max && breakpointKeys.includes(max))
    ? `${minWidthQuery} and (max-width: ${setBreakpoint(max)}px)`
    : minWidthQuery;

  return {
    [mediaQuery]: {
      '@mixin-content': {}
    }
  };
};

/**
 * Returns button mixin
 * @param {Object} mixin - parent node
 * @param {string} bg - background color
 * @param {string} color - text color
 * @param {string} bgHover - hover&focus color
 * @return {{color: *, background: *, border: *, "&:hover, &:focus": {cursor: string, background: *}}}
 *  return button mixin
 */
const button = (mixin, bg, color, bgHover) => ({
  background: bg,
  color,
  border: 0,

  '&:hover, &:focus': {
    background: bgHover,
    cursor: 'pointer',
    border: 0
  }
});

const ripples = () => ({
  position: 'relative',
  overflow: 'hidden',
  transform: 'translate3d(0, 0, 0)',
  'z-index': 100,

  '&:after': {
    content: '',
    display: 'block',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    'pointer-events': 'none',
    'background-image': 'radial-gradient(circle, #ffffff 10%, transparent 10.01%)',
    'background-repeat': 'no-repeat',
    'background-position': '50%',
    transform: 'scale(10,10)',
    opacity: 0,
    transition: 'transform 0.5s, opacity 1s'
  },

  '&:active:after': {
    transform: 'scale(0,0)',
    opacity: 0.2,
    transition: '0s'
  }
});

module.exports = {
  shadows,
  fonts,
  media,
  button,
  ripples
};
