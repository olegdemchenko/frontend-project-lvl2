import isObject from '../utils';

const stringify = (diff) => (
  diff.reduce((acc, [key, value]) => {
    if (isObject(value)) {
      const newAcc = Array.isArray(value) ? stringify(value) : stringify(Object.entries(value));
      const newStr = `${key}: { ${newAcc.join(', ')} }`;
      return [...acc, newStr];
    }
    return [...acc, `${key}: ${value}`];
  }, [])
);
export default (data) => stringify(data).join(', ');
