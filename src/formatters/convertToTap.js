import _ from 'lodash';

const getSpaces = (deep, backspace = 0) => {
  const startCountOfSpaces = 4;
  return ' '.repeat(startCountOfSpaces * deep - backspace);
};

const stringify = (value, deep) => {
  if (!_.isObject(value)) {
    return value;
  }

  const backspace = -2;
  const newSpaces = getSpaces(deep, backspace);
  return `{\n${Object.entries(value).map(([key, val]) => {
    if (_.isObject(val)) {
      return `${newSpaces}  ${key}: ${stringify(val, deep + 1)}`;
    }
    return `${newSpaces}  ${key}: ${val}`;
  }).join('\n')}\n${getSpaces(deep)}}`;
};

const format = (diff, deep = 1) => (
  diff.map(({
    key, status, value, newValue, children,
  }) => {
    const backspace = 2;
    const spaces = getSpaces(deep, backspace);
    const stringValue = stringify(value, deep);
    switch (status) {
      case 'changed': {
        return `${spaces}- ${key}: ${stringValue}\n${spaces}+ ${key}: ${stringify(newValue, deep)}`;
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
        const childrenStr = format(children, deep + 1).join('\n');
        return `${spaces}  ${key}: {\n${childrenStr}\n${getSpaces(deep)}}`;
      }
      default: {
        throw new Error(`Status ${status} is not supported`);
      }
    }
  })
);
export default (data) => `{\n${format(data).join('\n')}\n}`;
