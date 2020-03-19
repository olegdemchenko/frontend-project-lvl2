import isObject from './utils';

const _ = require('lodash');

const analyzeData = (before, after) => {
  const commonKeys = _.intersection(Object.keys(before), Object.keys(after));
  const uniqueKeysBefore = _.difference(Object.keys(before), Object.keys(after));
  const uniqueKeysAfter = _.difference(Object.keys(after), Object.keys(before));
  return [...commonKeys, ...uniqueKeysBefore, ...uniqueKeysAfter];
};
const findDifferences = (before, after) => {
  const difference = [...analyzeData(before, after)].reduce((acc, key) => {
    const bothObjects = (
      _.has(before, key)
      && _.has(after, key)
      && isObject(before[key])
      && isObject(after[key]));
    const notEqual = _.has(before, key) && _.has(after, key) && before[key] !== after[key];
    const notBefore = !_.has(before, key) && _.has(after, key);
    const notAfter = _.has(before, key) && !_.has(after, key);
    if (bothObjects) {
      return [...acc, [key, [...findDifferences(before[key], after[key])]]];
    }
    if (notEqual) {
      return [...acc, [`- ${key}`, before[key]], [`+ ${key}`, after[key]]];
    }
    if (notBefore) {
      return [...acc, [`+ ${key}`, after[key]]];
    }
    if (notAfter) {
      return [...acc, [`- ${key}`, before[key]]];
    }
    return [...acc, [key, before[key]]];
  }, []);
  return difference;
};
export default findDifferences;
/*
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
    return [...acc, [`+ ${key}`, after[key]]];*/