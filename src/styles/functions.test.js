import 'cross-fetch/polyfill';

import { testName } from '../__utils__/common';

import { units, lighten, opacify } from './functions';
import { defaults } from './settings';

describe(testName('postcss functions', 'functions'), () => {
  it('units conversion function with different values', () => {
    expect(units('24', '12')).toBe('2em');

    ['16', '36', '220'].forEach((option) => {
      const converted = units(option);

      expect(typeof converted).toBe('string');
      expect(converted.slice(converted.length - 2, converted.length)).toEqual('em');
      expect(Number(converted.slice(0, converted.length - 2))).toEqual(option / defaults.fontSizePxBase);
    });
  });

  it('lighten with different options', () => {
    expect(lighten()).toEqual('#000000');
    expect(lighten('red', '0.5')).toEqual('#ff0000');
  });

  it('opacify with different options', () => {
    expect(opacify()).toEqual('#000000');
    expect(opacify('red', '0.5')).toEqual('#ff00007f');
  });
});
