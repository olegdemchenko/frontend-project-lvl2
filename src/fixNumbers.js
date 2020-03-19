import isObject from './utils';

const fixNumbers = (obj) => (
  Object.entries(obj).reduce((acc, [key, value]) => {
    const convertedValue = parseFloat(value);
    if (isObject(value)) {
      return { ...acc, [key]: fixNumbers(value) };
    }
    if (convertedValue) {
      return { ...acc, [key]: convertedValue };
    }
    return { ...acc, [key]: value };
  }, {})
);
export default fixNumbers;
