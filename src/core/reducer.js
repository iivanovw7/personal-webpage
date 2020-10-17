/**
 * Module contains global core reducer, common for all animation scenes
 * @module core/reducer
 * @author Igor Ivanov
 */
import { produce } from 'immer';

import * as actionTypes from '../constants/actionTypes';
import * as utils from '../utils';

/* eslint-disable default-case, no-param-reassign */
const coreReducer = (state = {}, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.APP_RESIZE:
        if (action.adaptiveSize) {
          draft.sceneSize = utils.windowSize();
        } else {
          draft.sceneSize.resolution = window.devicePixelRatio;
        }
        break;
      case actionTypes.TICK:
        draft.animation.previousTick = draft.animation.tick;
        draft.animation.tick = draft.animation.tick + 1;
        draft.animation.currentTime = window.performance.now();
        break;
      default:
        return state;
    }
  });

export default coreReducer;
