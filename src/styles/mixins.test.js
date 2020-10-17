import 'cross-fetch/polyfill';

import { testName } from '../__utils__/common';

import * as mixins from './mixins';
import { defaults } from './settings';

describe(testName('postcss mixins', 'test suite'), () => {
  it(testName('shadows', 'test suite'), () => {
    const options = ['xs', 'md', 'lg', 'photo'];
    const expected = [
      '0 2px 4px 0 rgba(0,0,0,0.10)',
      '0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08)',
      '0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)',
      '0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.8)',
      '0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08)'
    ];

    options.forEach((option, index) => {
      const mixin = mixins.shadows({}, option);
      const keys = Object.keys(mixin);

      // Expecting appropriate type
      expect(typeof mixin).toBe('object');

      // Expecting appropriate css property name to be included
      expect(keys.findIndex((key) => key === 'box-shadow')).not.toBe(-1);

      expect(mixins.shadows({}, option)).toEqual({
        'box-shadow': expected[index]
      });
    });

    expect(mixins.shadows({}, 'test')).toEqual({
      'box-shadow': '0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08)'
    });
  });

  it(testName('media', 'mixins test suite'), () => {
    const { breakpoints } = defaults;
    const options = Object.keys(breakpoints);

    options.forEach((option) => {
      const mixin = mixins.media({}, option, 'xxl');
      const keys = Object.keys(mixin);
      // eslint-disable-next-line max-len
      const mediaQuery = `@media only screen and (min-width: ${breakpoints[option]}px) and (max-width: 2560px)`; // prettier-ignore

      // Expecting appropriate type
      expect(typeof mixin).toBe('object');

      // Expect mixin to contain correct property
      expect(keys.findIndex((key) => key === mediaQuery)).not.toBe(-1);
    });
  });

  it(testName('fonts', 'test suite'), () => {
    const mixin = mixins.fonts();
    const keys = Object.keys(mixin);

    // Expecting appropriate type and length
    expect(typeof mixin).toBe('object');
    expect(keys.length).toBeGreaterThanOrEqual(2);

    // Expecting every @media screen property to contain font-size key
    keys.map((entry) => expect(Object.prototype.hasOwnProperty.call(mixin[entry], 'font-size')).toBe(true));
  });
});
