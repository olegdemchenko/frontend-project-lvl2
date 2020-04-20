import _ from 'lodash';

const analyzeData = (before, after) => (
  _.union([...Object.keys(before), ...Object.keys(after)])
);
const findDifference = (before, after) => (
  analyzeData(before, after).map((key) => {
    const bothObjects = _.isObject(before[key]) && _.isObject(after[key]);
    const props = { key };
    if (!_.has(before, key)) {
      return { ...props, status: 'added', value: after[key] };
    }

    if (!_.has(after, key)) {
      return { ...props, status: 'deleted', value: before[key] };
    }

    if (bothObjects) {
      return { ...props, status: 'parent', children: findDifference(before[key], after[key]) };
    }

    if (before[key] !== after[key]) {
      return {
        ...props, status: 'changed', oldValue: before[key], newValue: after[key],
      };
    }

    return { ...props, status: 'not changed', value: before[key] };
  })
);
export default findDifference;
