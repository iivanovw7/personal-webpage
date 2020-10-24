/**
 * Module contains unique keys
 * @module constants/keys
 * @author Igor Ivanov
 */
export const TEXT = Symbol('text');
export const LINK = Symbol('link');

/**
 * Set of device types
 * @type {{tablet: symbol, desktop: symbol, wideScreen: symbol, fullHd: symbol, mobile: symbol}}
 */
export const deviceMap = {
  mobile: Symbol('mobile'),
  tablet: Symbol('tablet'),
  desktop: Symbol('desktop')
};
