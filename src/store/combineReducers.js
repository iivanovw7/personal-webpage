/**
 * Module used to create combine reducers.
 * @module stores/combineReducers.
 */
import { combineReducers } from 'redux';

import coreReducer from '../core/reducer';

/**
 * Merges reducers.
 * @return {function} createReducer - returns function used for store combining.
 */
export default function createReducer() {
  return combineReducers({
    core: coreReducer
    // any additional reduces
  });
}
