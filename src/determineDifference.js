const _ = require('lodash');

const determineDifference = (data1, data2) => {
  const commonKeys = _.intersection(Object.keys(data1), Object.keys(data2));
  const uniqueKeysData1 = _.difference(Object.keys(data1), Object.keys(data2));
  const uniqueKeysData2 = _.difference(Object.keys(data2), Object.keys(data1));
  const difference = [...commonKeys, ...uniqueKeysData1, ...uniqueKeysData2].reduce((acc, key) => {
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] === data2[key]) {
        return { ...acc, [String(key)]: data1[key] };
      }
      return { ...acc, [`+ ${key}`]: data2[key], [`- ${key}`]: data1[key] };
    }
    if (_.has(data1, key) && !_.has(data2, key)) {
      return { ...acc, [`- ${key}`]: data1[key] };
    }
    return { ...acc, [`+ ${key}`]: data2[key] };
  }, {});
  return JSON.stringify(difference);
};
export default determineDifference;
