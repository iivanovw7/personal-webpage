/**
 * Module contains common helper functions
 * @module utils/helpers
 * @author Igor Ivanov
 */

import commonConfig from '../config/common';

/**
 * Requires all files in a directory.
 * @param {*} r require.context.
 * @return {void}
 */
export function requireAll(r) {
  r.keys().forEach(r);
}

/**
 * Runs over an array and executes callback on every element.
 * @param {Array<*>} arr - array of values.
 * @param {function} callback - callback function.
 * @return {*} returns callback function call for each value in array passed in parameters.
 */
export const forEachCallback = (arr = [], callback) => arr.slice(0).forEach(callback);

/**
 * Tries changing selected DOM node class name with another one, if  node has it,
 * if not - adds class name in classList.
 *
 * @param {Object} node - DOM element.
 * @param {string} target - class name to be changed.
 * @param {string} className -  class name target will be changed with.
 * @return {void} adds new className or swaps target class name with new one.
 */
export function swapClassName(node, target, className) {
  // prettier-ignore
  return node.classList.contains(target)
    ? node.classList.replace(target, className)
    : node.classList.add(className);
}

/**
 * Combines configuration object to be passed in props to create animation scene.
 * @param {string} nodeId - DOM node id which is used as canvas parent element.
 * @param {Object} config - scene config object.
 * @return {Object} - `default` animation scene config.
 * @type {function}
 *
 * @property {Object} sceneParams
 * @property {Object} assets
 * @property {string} customCursor
 * @property {string} customClass
 * @property {Object} filter
 * @property {HTMLElement} parentNode
 *
 * (example config module: {@link module:config/common})
 */
export const combineDefaultConfig = (nodeId, config) => {
  const parentNode = document.getElementById(nodeId);

  return {
    sceneParams: {
      ...config.sceneParams,
      ReferenceSize: commonConfig.ReferenceSize
    },
    animation: {
      tick: 1,
      previousTick: 0,
      startTime: window.performance.now(),
      currentTime: window.performance.now()
    },
    messages: commonConfig.messages,
    customClass: config.customClass,
    assets: config.assets,
    customCursor: config.customCursor,
    filter: config.filter,
    parentNode: parentNode !== null ? parentNode : document.body
  };
};

/**
 * Returns current browser window parameters, used to resize canvas if adaptive mode selected.
 * @return {Object} - object contains screen size, resolution and screen center coordinates.
 * @type {function}
 * @property {number} width
 * @property {number} height
 * @property {number} resolution
 * @property {Object} sceneCenter
 */
export const windowSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
  resolution: window.devicePixelRatio,
  sceneCenter: {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  }
});

export const setupInitialState = (adaptiveSize, config) => ({
  core: {
    adaptiveSize,
    customClass: config.customClass,
    // prettier-ignore
    sceneSize: (!adaptiveSize && config.sceneSize)
      ? config.sceneSize
      : windowSize()
  }
});

/**
 * Debounce function
 * @param {function} fn - function to be executed.
 * @param {number} time - debounce delay setting (default value is 200).
 * @return {function} returns function passed in params with delay.
 */
export const debounce = (fn, time = 200) => {
  let timeout;

  if (typeof fn === 'function') {
    return function debounced() {
      // eslint-disable-next-line prefer-rest-params
      const functionCall = () => fn.apply(this, arguments);

      clearTimeout(timeout);
      timeout = setTimeout(functionCall, time);
    };
  }
};
