import _ from 'lodash';

const toString = (arg) => (_.isObject(arg) ? '[complex value]' : `"${arg.toString()}"`);
const plain = (diff, path = '') => (
  diff.reduce((acc, {
    key, status, value, newValue, children,
  }) => {
    const fullPath = `${path}${key}`;
    if (children) {
      const newPath = `${fullPath}.`;
      const newAcc = plain(children, newPath);
      return [...acc, ...newAcc];
    }
    if (status === 'changed') {
      const str = `Property "${fullPath}" was changed from ${toString(value)} to ${toString(newValue)}`;
      return [...acc, str];
    }
    if (status === 'added') {
      const str = `Property "${fullPath}" was added with value ${toString(value)}`;
      return [...acc, str];
    }
    if (status === 'deleted') {
      const str = `Property "${fullPath}" was deleted`;
      return [...acc, str];
    }
    return acc;
  }, [])
);
export default (diff) => plain(diff).join('\n');
