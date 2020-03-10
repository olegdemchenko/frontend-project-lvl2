const _ = require('lodash');

const findDifferences = (data1, data2) => {
  const commonKeys = _.intersection(Object.keys(data1), Object.keys(data2));
  const uniqueKeysData1 = _.difference(Object.keys(data1), Object.keys(data2));
  const uniqueKeysData2 = _.difference(Object.keys(data2), Object.keys(data1));
  const difference = [...commonKeys, ...uniqueKeysData1, ...uniqueKeysData2].reduce((acc, key) => {
    if (_.has(data1, key) && _.has(data2, key)) {
      if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
        return { ...acc, [key]: { ...findDifferences(data1[key], data2[key]) } };
      }
      if (data1[key] === data2[key]) {
        return { ...acc, [key]: data1[key] };
      }
      return { ...acc, [`- ${key}`]: data1[key], [`+ ${key}`]: data2[key] };
    }
    if (_.has(data1, key) && !_.has(data2, key)) {
      return { ...acc, [`- ${key}`]: data1[key] };
    }
    return { ...acc, [`+ ${key}`]: data2[key] };
  }, {});
  return difference;
};
export default findDifferences;
