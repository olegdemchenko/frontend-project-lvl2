import isObject from '../utils';

const parseNameOfProperty = (key) => {
  const status = key[0];
  if (status === '+' || status === '-') {
    return [status, key.slice(2)];
  }
  return [status, key];
};
const toString = (arg) => (isObject(arg) ? '[complex value]' : `"${arg.toString()}"`);
const plain = (diff, path = '') => (
  diff.reduce((acc, [key, value]) => {
    const [status, propertyName] = parseNameOfProperty(key);
    const fullPath = `${path}${propertyName}`;
    const hasNewProperty = ([property]) => property === `+ ${propertyName}`;
    const hasOldProperty = ([property]) => property === `- ${propertyName}`;
    const propertyChanged = (status === '-' && diff.some(hasNewProperty));
    const propertyRemoved = (status === '-' && !diff.some(hasNewProperty));
    const propertyAdded = (status === '+' && !diff.some(hasOldProperty));
    const propertyWithComplexValue = (status !== '+' && status !== '-' && Array.isArray(value));
    if (propertyChanged) {
      acc.push(`Property "${fullPath}" was changed from ${toString(value)} to ${toString(diff.find(hasNewProperty)[1])}`);
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
