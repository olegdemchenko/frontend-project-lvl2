import _ from 'lodash';

const analyzeData = (before, after) => (
  _.uniq([...Object.keys(before), ...Object.keys(after)]).sort()
);
const findDifference = (before, after) => (
  [...analyzeData(before, after)].map((key) => {
    const bothObjects = _.isObject(before[key]) && _.isObject(after[key]);
    const props = { key };
    const beforeValue = before[key];
    const afterValue = after[key];
    if (bothObjects) {
      return { ...props, status: 'tree', children: [...findDifference(before[key], after[key])] };
    }
    if (!beforeValue) {
      return { ...props, status: 'added', value: afterValue };
    }
    if (!afterValue) {
      return { ...props, status: 'deleted', value: beforeValue };
    }
    if (beforeValue !== afterValue) {
      return {
        ...props, status: 'changed', value: beforeValue, newValue: afterValue,
      };
    }
    return { ...props, status: 'not changed', value: beforeValue };
  })
);
export default findDifference;
