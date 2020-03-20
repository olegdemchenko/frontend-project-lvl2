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
    const bothObjects = (
      _.has(before, key)
      && _.has(after, key)
      && isObject(before[key])
      && isObject(after[key]));
    const valuesNotEqual = _.has(before, key) && _.has(after, key) && before[key] !== after[key];
    const beforeHasntKey = !_.has(before, key) && _.has(after, key);
    const afterHasntKey = _.has(before, key) && !_.has(after, key);
    if (bothObjects) {
      return [...acc, [key, findDifferences(before[key], after[key])]];
    }
    if (valuesNotEqual) {
      return [...acc, [`- ${key}`, before[key]], [`+ ${key}`, after[key]]];
    }
    if (beforeHasntKey) {
      return [...acc, [`+ ${key}`, after[key]]];
    }
    if (afterHasntKey) {
      return [...acc, [`- ${key}`, before[key]]];
    }
    return [...acc, [key, before[key]]];
  }, [])
);
export default findDifferences;
