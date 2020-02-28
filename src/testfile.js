const _ = require('lodash');

const before = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};
const after = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};
const calculateDependencies = (start, end) => {
  const int = _.intersection(Object.keys(start), Object.keys(end));
  const diff = _.difference(Object.keys(start), Object.keys(end));
  const diff2 = _.difference(Object.keys(end), Object.keys(start));
  const result = [...int, ...diff, ...diff2].reduce((acc, key) => {
    if (_.has(start, key) && _.has(end, key)) {
      if (start[key] === end[key]) {
        return { ...acc, [String(key)]: start[key] };
      }
      return { ...acc, [`+ ${key}`]: end[key], [`- ${key}`]: start[key] };
    }
    if (_.has(start, key) && !_.has(end, key)) {
      return { ...acc, [`- ${key}`]: start[key] };
    }
    return { ...acc, [`+ ${key}`]: end[key] };
  }, {});
  return JSON.stringify(result);
};
console.log(JSON.parse(JSON.stringify(after)));
