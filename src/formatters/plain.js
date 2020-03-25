import _ from 'lodash';

const parseNameOfProperty = (key) => {
  const status = key[0];
  const propertyName = key.slice(2);
  switch (status) {
    case '+':
      return { propertyName, added: true };
    case '-':
      return { propertyName, removed: true };
    default:
      return { propertyName, notChanged: true };
  }
};
const findChangedProperty = (propertyName, status, diff) => {
  if (status.added) {
    return diff.find(([property]) => property === `- ${propertyName}`);
  }
  if (status.removed) {
    return diff.find(([property]) => property === `+ ${propertyName}`);
  }
  return null;
};
const toString = (arg) => (_.isObject(arg) ? '[complex value]' : `"${arg.toString()}"`);

const plain = (diff, path = '') => (
  diff.reduce((acc, [key, value]) => {
    const { propertyName, ...status } = parseNameOfProperty(key);
    const fullPath = `${path}${propertyName}`;
    if (status.notChanged && Array.isArray(value)) {
      const newPath = `${fullPath}.`;
      const complexValueAcc = plain(value, newPath);
      const newAcc = acc.concat(complexValueAcc);
      return newAcc;
    }
    const changedProperty = findChangedProperty(propertyName, status, diff);
    if (status.removed && changedProperty) {
      const str = `Property "${fullPath}" was changed from ${toString(value)} to ${toString(changedProperty[1])}`;
      return [...acc, str];
    }
    if (status.removed) {
      const str = `Property "${fullPath}" was deleted`;
      return [...acc, str];
    }
    if (status.added && !changedProperty) {
      const str = `Property "${fullPath}" was added with value ${toString(value)}`;
      return [...acc, str];
    }
    return acc;
  }, [])
);
export default (diff) => plain(diff).join('\n');
