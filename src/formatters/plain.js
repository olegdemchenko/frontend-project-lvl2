import _ from 'lodash';

const parseNameOfProperty = (key) => {
  const status = key[0];
  let propertyName;
  if (status === '+' || status === '-') {
    propertyName = key.slice(2);
  } else {
    propertyName = key;
  }
  return [status, propertyName];
};
const toString = (arg) => (typeof arg === 'object' ? '[complex value]' : `"${arg.toString()}"`);
const plain = (diff, path = '') => (
  Object.entries(diff).reduce((acc, [key, value]) => {
    const [status, propertyName] = parseNameOfProperty(key);
    const fullPath = `${path}${propertyName}`;
    const valueType = typeof value;
    const propertyChanged = (status === '-' && _.has(diff, `+ ${propertyName}`));
    const propertyRemoved = (status === '-' && !_.has(diff, `+ ${propertyName}`));
    const propertyAdded = (status === '+' && !_.has(diff, `- ${propertyName}`));
    const propertyWithComplexValue = (status !== '+' && status !== '-' && valueType === 'object');
    if (propertyChanged) {
      acc.push(`Property "${fullPath}" was changed from ${toString(value)} to ${toString(diff[`+ ${propertyName}`])}`);
    }
    if (propertyRemoved) {
      acc.push(`Property "${fullPath}" was deleted`);
    }
    if (propertyAdded) {
      acc.push(`Property "${fullPath}" was added with value ${toString(value)}`);
    }
    if (propertyWithComplexValue) {
      const newPath = `${fullPath}.`;
      const complexValueAcc = plain(value, newPath);
      const newAcc = acc.concat(complexValueAcc);
      return newAcc;
    }
    return acc;
  }, [])
);
export default (data) => plain(data).join('\n');
