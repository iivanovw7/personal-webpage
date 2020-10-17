/**
 * Module contains global core actions, common for all animation scenes
 * @module core/actions
 * @author Igor Ivanov
 */
import * as actionTypes from '../constants/actionTypes';

/* eslint-disable import/prefer-default-export */
/**
 * Screen resize action.
 * @param {boolean} adaptiveSize
 *      true if current scene is set to adaptive screen mode
 * @return {Object}
 *      An action object with a type of RESIZE and payload (adaptiveSize)
 */
export function resize(adaptiveSize) {
  return {
    type: actionTypes.APP_RESIZE,
    adaptiveSize
  };
}

/**
 * Animation tick action.
 * @return {Object}
 *      An action object with a type of TICK
 */
export function tick() {
  return {
    type: actionTypes.APP_RESIZE
  };
}
