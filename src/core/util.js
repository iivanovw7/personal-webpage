/**
 * Module contains utils used in core `module`
 * @module core/util
 * @author Igor Ivanov
 */
/* eslint-disable import/prefer-default-export */
export const getState = (store, key) => store.getState()[key];
