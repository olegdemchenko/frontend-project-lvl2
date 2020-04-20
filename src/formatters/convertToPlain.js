import _ from 'lodash';

const toString = (arg) => (_.isObject(arg) ? '[complex value]' : `"${arg.toString()}"`);

const plain = (diff, path = '') => (
  diff.map(({
    key, status, value, oldValue, newValue, children,
  }) => {
    const fullPath = `${path}${key}`;
    switch (status) {
      case 'changed': {
        return `Property "${fullPath}" was changed from ${toString(oldValue)} to ${toString(newValue)}`;
      }
      case 'added': {
        return `Property "${fullPath}" was added with value ${toString(value)}`;
      }
      case 'deleted': {
        return `Property "${fullPath}" was deleted`;
      }
      case 'not changed': {
        return null;
      }
      case 'parent': {
        const newPath = `${fullPath}.`;
        return plain(children, newPath);
      }
      default: {
        throw new Error(`Status ${status} is not supported`);
      }
    }
  })
);
export default (diff) => plain(diff).flat(Infinity).filter((str) => str).join('\n');
