import _ from 'lodash';

const getSpaces = (depth, backspace = 0) => {
  const startCountOfSpaces = 4;
  return ' '.repeat(startCountOfSpaces * depth - backspace);
};

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }

  const backspace = -2;
  const newSpaces = getSpaces(depth, backspace);
  return `{\n${Object.entries(value).map(([key, val]) => {
    if (_.isObject(val)) {
      return `${newSpaces}  ${key}: ${stringify(val, depth + 1)}`;
    }
    return `${newSpaces}  ${key}: ${val}`;
  }).join('\n')}\n${getSpaces(depth)}}`;
};

const format = (diff, depth = 1) => (
  diff.map(({
    key, status, value, oldValue, newValue, children,
  }) => {
    const backspace = 2;
    const spaces = getSpaces(depth, backspace);
    const stringValue = stringify(value, depth);
    switch (status) {
      case 'changed': {
        return `${spaces}- ${key}: ${stringify(oldValue, depth)}\n${spaces}+ ${key}: ${stringify(newValue, depth)}`;
      }
      case 'added': {
        return `${spaces}+ ${key}: ${stringValue}`;
      }
      case 'deleted': {
        return `${spaces}- ${key}: ${stringValue}`;
      }
      case 'not changed': {
        return `${spaces}  ${key}: ${stringValue}`;
      }
      case 'parent': {
        const childrenStr = format(children, depth + 1).join('\n');
        return `${spaces}  ${key}: {\n${childrenStr}\n${getSpaces(depth)}}`;
      }
      default: {
        throw new Error(`Status ${status} is not supported`);
      }
    }
  })
);
export default (data) => `{\n${format(data).join('\n')}\n}`;
