import 'cross-fetch/polyfill';

import { testName } from '../__utils__/common';
import Check from '../__utils__/helpers/object';

import contactsConfig from './contacts';

describe(testName('config/contacts', 'functions'), () => {
  it(testName('delay', 'test suite'), () => {
    const check = new Check({
      param: contactsConfig.delay
    });

    check.checkExistence().checkType('number');
  });

  it(testName('chunks', 'config parameter with at least one child'), () => {
    const check = new Check({
      param: contactsConfig.chunks[0]
    });

    check
      .checkExistence()
      .checkType('object')
      .checkProp('type', 'symbol')
      .checkProp('key', 'string')
      .checkProp('value', 'string');
  });
});
