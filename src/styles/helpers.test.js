import 'cross-fetch/polyfill';

import { testName } from '../__utils__/common';

import { isSettingsVariable, percentage } from './helpers';
import { defaults } from './settings';

describe(testName('style helpers', 'functions'), () => {
  it(testName('isSettingsVariable', 'test suite'), () => {
    expect(isSettingsVariable('$fontSizePxBase')).toBe(defaults.fontSizePxBase);
  });

  it(testName('isSettingsVariable', 'with different values'), () => {
    [16, null, undefined, 'string', null, '$bgColor2'].forEach((option) => {
      expect(isSettingsVariable(option)).toBe(option);
    });
    expect(isSettingsVariable('$bgColor')).toBe(defaults.bgColor);
  });

  it(testName('percentage', 'with different values'), () => {
    expect(percentage(0.02)).toEqual('2%');

    [0.01, 25, 200, 1000].forEach((option) => {
      const percents = percentage(option);

      expect(typeof percents).toBe('string');
      expect(percents.endsWith('%')).toBe(true);
      expect(Number(percents.slice(0, percents.length - 1))).toBeLessThanOrEqual(100);
    });
  });
});
