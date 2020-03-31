import _ from 'lodash';

const analyzeData = (before, after) => {
  const commonKeys = _.intersection(Object.keys(before), Object.keys(after));
  const uniqueKeysBefore = _.difference(Object.keys(before), Object.keys(after));
  const uniqueKeysAfter = _.difference(Object.keys(after), Object.keys(before));
  return [...commonKeys, ...uniqueKeysBefore, ...uniqueKeysAfter];
};
const findDifference = (before, after) => (
  [...analyzeData(before, after)].reduce((acc, key) => {
    const bothObjects = _.isObject(before[key]) && _.isObject(after[key]);
    const props = { key };
    const beforeValue = before[key];
    const afterValue = after[key];
    if (bothObjects) {
      return [...acc, { ...props, status: 'tree', children: [...findDifference(before[key], after[key])] }];
    }
    if (!beforeValue) {
      return [...acc, { ...props, status: 'added', value: afterValue }];
    }
    if (!afterValue) {
      return [...acc, { ...props, status: 'deleted', value: beforeValue }];
    }
    if (beforeValue !== afterValue) {
      return [...acc, {
        ...props, status: 'changed', value: beforeValue, newValue: afterValue,
      }];
    }
    return [...acc, { ...props, status: 'not changed', value: beforeValue }];
  }, [])
);
export default findDifference;
