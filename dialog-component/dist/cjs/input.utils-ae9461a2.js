'use strict';

const index = require('./index-e56e09b8.js');

/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const getCounterText = (value, maxLength, counterFormatter) => {
  const valueLength = value == null ? 0 : value.toString().length;
  const defaultCounterText = defaultCounterFormatter(valueLength, maxLength);
  /**
   * If developers did not pass a custom formatter,
   * use the default one.
   */
  if (counterFormatter === undefined) {
    return defaultCounterText;
  }
  /**
   * Otherwise, try to use the custom formatter
   * and fallback to the default formatter if
   * there was an error.
   */
  try {
    return counterFormatter(valueLength, maxLength);
  }
  catch (e) {
    index.printIonError('Exception in provided `counterFormatter`.', e);
    return defaultCounterText;
  }
};
const defaultCounterFormatter = (length, maxlength) => {
  return `${length} / ${maxlength}`;
};

exports.getCounterText = getCounterText;

//# sourceMappingURL=input.utils-ae9461a2.js.map