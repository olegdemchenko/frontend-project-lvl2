const _ = require('lodash');

const findDifferences = (before, after) => {
  const commonKeys = _.intersection(Object.keys(before), Object.keys(after));
  const uniqueKeysBefore = _.difference(Object.keys(before), Object.keys(after));
  const uniqueKeysAfter = _.difference(Object.keys(after), Object.keys(before));
  const difference = [...commonKeys, ...uniqueKeysBefore, ...uniqueKeysAfter].reduce((acc, key) => {
    if (_.has(before, key) && _.has(after, key)) {
      if (typeof before[key] === 'object' && typeof after[key] === 'object') {
        return { ...acc, [key]: { ...findDifferences(before[key], after[key]) } };
      }
      if (before[key] === after[key]) {
        return { ...acc, [key]: before[key] };
      }
      return { ...acc, [`- ${key}`]: before[key], [`+ ${key}`]: after[key] };
    }
    if (_.has(before, key) && !_.has(after, key)) {
      return { ...acc, [`- ${key}`]: before[key] };
    }
    return { ...acc, [`+ ${key}`]: after[key] };
  }, {});
  return difference;
};
export default findDifferences;
