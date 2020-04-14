import _ from 'lodash';

const toString = (arg) => (_.isObject(arg) ? '[complex value]' : `"${arg.toString()}"`);

const plain = (diff, path = '') => (
  diff.map(({
    key, status, value, newValue, children,
  }) => {
    const fullPath = `${path}${key}`;
    switch (status) {
      case 'changed': {
        return `Property "${fullPath}" was changed from ${toString(value)} to ${toString(newValue)}`;
      }
      case 'added': {
        return `Property "${fullPath}" was added with value ${toString(value)}`;
      }
      case 'deleted': {
        return `Property "${fullPath}" was deleted`;
      }
      case 'not changed': {
        return '';
      }
      case 'parent': {
        const newPath = `${fullPath}.`;
        return `${plain(children, newPath).filter((str) => str !== '').join('\n')}`;
      }
      default: {
        throw new Error(`Status ${status} is not supported`);
      }
    }
  })
);
export default (diff) => plain(diff).filter((str) => str !== '').join('\n');
