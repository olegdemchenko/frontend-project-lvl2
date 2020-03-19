import isObject from './utils';

const _ = require('lodash');

const analyzeData = (before, after) => {
  const commonKeys = _.intersection(Object.keys(before), Object.keys(after));
  const uniqueKeysBefore = _.difference(Object.keys(before), Object.keys(after));
  const uniqueKeysAfter = _.difference(Object.keys(after), Object.keys(before));
  return [...commonKeys, ...uniqueKeysBefore, ...uniqueKeysAfter];
};
const findDifferences = (before, after) => (
  [...analyzeData(before, after)].reduce((acc, key) => {
    if (_.has(before, key) && _.has(after, key)) {
      if (isObject(before[key]) && isObject(after[key])) {
        return [...acc, [key, [...findDifferences(before[key], after[key])]]];
      }
      if (before[key] === after[key]) {
        return [...acc, [key, before[key]]];
      }
      return [...acc, [`- ${key}`, before[key]], [`+ ${key}`, after[key]]];
    }
    if (_.has(before, key) && !_.has(after, key)) {
      return [...acc, [`- ${key}`, before[key]]];
    }
    return [...acc, [`+ ${key}`, after[key]]];
  }, [])
);
export default findDifferences;
