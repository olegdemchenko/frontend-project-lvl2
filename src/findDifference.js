import _ from 'lodash';
import isObject from './utils';

const analyzeData = (before, after) => {
  const commonKeys = _.intersection(Object.keys(before), Object.keys(after));
  const uniqueKeysBefore = _.difference(Object.keys(before), Object.keys(after));
  const uniqueKeysAfter = _.difference(Object.keys(after), Object.keys(before));
  return [...commonKeys, ...uniqueKeysBefore, ...uniqueKeysAfter];
};
const getPrimitiveResult = (key, beforeValue, afterValue) => {
  switch (true) {
    case !beforeValue:
      return [[`+ ${key}`, afterValue]];
    case !afterValue:
      return [[`- ${key}`, beforeValue]];
    case beforeValue !== afterValue:
      return [[`- ${key}`, beforeValue], [`+ ${key}`, afterValue]];
    case beforeValue === afterValue:
      return [[`${key}`, beforeValue]];
    default:
      throw new Error('Mistake!!!!');
  }
};
const findDifferences = (before, after) => (
  [...analyzeData(before, after)].reduce((acc, key) => {
    const bothObjects = isObject(before[key]) && isObject(after[key]);
    if (bothObjects) {
      return [...acc, [`${key}`, findDifferences(before[key], after[key])]];
    }
    return [...acc, ...getPrimitiveResult(key, before[key], after[key])];
  }, [])
);
export default findDifferences;
