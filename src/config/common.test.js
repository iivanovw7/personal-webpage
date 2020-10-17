import 'cross-fetch/polyfill';

import { testName } from '../__utils__/common';
import Check from '../__utils__/helpers/object';

import commonConfig from './common';

describe(testName('config/common', 'functions'), () => {
  it(testName('ReferenceSize', 'config parameter'), () => {
    const check = new Check({
      param: commonConfig.ReferenceSize
    });

    // prettier-ignore
    check
      .checkExistence()
      .checkType('object')
      .checkProp('width', 'number')
      .checkProp('height', 'number');
  });
});
