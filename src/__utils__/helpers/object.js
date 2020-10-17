/**
 * Module contains jest test utils
 * @param {Object} props - function props used during verifications
 *    props.param - object parameter being tested
 *
 * @module __utils__/helpers/object
 */
const CheckProp = function checkProp(props) {
  this.props = props;
};

/**
 * Verifies property existence.
 * @return {this}
 *    returns reference of the execution context.
 */
CheckProp.prototype.checkExistence = function checkExistence() {
  // prettier-ignore
  expect(this.props.param)
    .not
    .toBe(undefined);

  return this;
};

/**
 * Verifies property type
 * @param {any} type
 *    property type to be verified
 * @return {this}
 *    returns reference of the execution context.
 */
CheckProp.prototype.checkType = function checkType(type) {
  // prettier-ignore
  expect(typeof this.props.param)
    .toBe(type);

  return this;
};

/**
 * Preforms full type and value property check if called with `propValue` in parameters.
 *
 * @param {string} prop
 *    property name
 * @param {string} propType
 *    desired property type
 * @param {*} [propValue]
 *    expected property value
 * @return {this}
 *    returns reference of the execution context.
 */
CheckProp.prototype.checkProp = function checkProp(prop, propType, propValue) {
  // prettier-ignore
  expect(typeof this.props.param[prop])
    .not
    .toBe(undefined);

  // prettier-ignore
  expect(typeof this.props.param[prop])
    .toBe(propType);

  // prettier-ignore
  if (propValue) {
    expect(this.props.param)
      .toHaveProperty(prop, propValue);
  } else {
    expect(this.props.param)
      .toHaveProperty(prop);
  }

  return this;
};

export default CheckProp;
