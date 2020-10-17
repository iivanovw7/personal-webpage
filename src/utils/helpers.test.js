import 'cross-fetch/polyfill';

import { testName } from '../__utils__/common';
import Check from '../__utils__/helpers/object';

import { debounce, forEachCallback, swapClassName, windowSize, combineDefaultConfig } from './helpers';

let undef;

describe(testName('utils/helpers', 'functions'), () => {
  describe(testName('swapClassName', 'test suite'), () => {
    beforeEach(() => {
      document.body.innerHTML = '<span id="username" class="test" />';
      jest.clearAllMocks();
    });

    afterEach(() => {
      document.body.innerHTML = '';
    });

    // eslint-disable-next-line require-jsdoc
    function checkClass(node, className, expected) {
      expect(node.classList.contains(className)).toBe(expected);
    }

    it('Should add class to a DOM element', () => {
      const node = document.getElementById('username');
      swapClassName(node, 'test', 'mock');
      checkClass(node, 'mock', true);
      checkClass(node, 'test', false);
    });

    it('Should add new class name if target name is not present in list', () => {
      const node = document.getElementById('username');
      swapClassName(node, 'test2', 'mock');
      checkClass(node, 'test', true);
      checkClass(node, 'mock', true);
    });
  });

  describe(testName('combineDefaultConfig', 'test suite'), () => {
    it('Should verify parentNode field', () => {
      const config = combineDefaultConfig(undef, {});
      expect(config.parentNode).toEqual(document.body);
    });

    it('Should verify common config field', () => {
      const config = combineDefaultConfig('app', {});
      expect(config.sceneParams.ReferenceSize).not.toBe(undefined);
      expect(config.sceneParams.ReferenceSize).toHaveProperty('width');
      expect(config.sceneParams.ReferenceSize).toHaveProperty('height');
    });
  });

  describe(testName('windowSize', 'test suite'), () => {
    it('Should run func and verify object fields', () => {
      const check = new Check({
        param: windowSize()
      });

      check
        .checkExistence()
        .checkType('object')
        .checkProp('width', 'number')
        .checkProp('height', 'number')
        .checkProp('resolution', 'number')
        .checkProp('sceneCenter', 'object');
    });

    it('Should run func and compare result with window params', () => {
      const windowParams = windowSize();
      expect(windowParams.sceneCenter.x).toBe(window.innerWidth / 2);
      expect(windowParams.sceneCenter.y).toBe(window.innerHeight / 2);
    });
  });

  describe(testName('forEachCallback', 'test suite'), () => {
    it('Should run func and verify the result', () => {
      const arr = [1, 2, 3];
      const fn = jest.fn();

      forEachCallback(arr, (value) => fn(value));
      expect(fn.mock.calls.length).toBe(3);
    });
  });

  describe(testName('debounce', 'test suite'), () => {
    it('Should run func', () => {
      const fn = jest.fn();
      debounce(fn(), 200);
      expect(fn.mock.calls.length).toBe(1);
    });

    it('Should check wrong data types', () => {
      // eslint-disable-next-line global-require
      const helpers = require('./helpers');
      const spy = jest.spyOn(helpers, 'debounce');
      [16, null, undefined, 'string', null, '$bgColor2'].forEach((type) => {
        debounce(type, 200);
      });
      expect(spy.mock.calls.length).toBe(6);
      expect(spy.mock.results.length).toBe(6);
      expect(spy).not.toThrow();
    });

    it('Should run func multiple times', () => {
      jest.useFakeTimers();

      const fn = jest.fn();
      const debouncedFunc = debounce(fn, 1000);

      expect(fn).toHaveBeenCalledTimes(0);

      for (let i = 0; i < 100; i++) {
        debouncedFunc();
      }

      // fast-forward time
      jest.runAllTimers();

      expect(fn).toBeCalledTimes(1);
      expect(fn.mock.calls.length).toBe(1);
    });
  });
});
