import _ from 'lodash';

const toString = (value, spaces) => {
  if (_.isObject(value)) {
    const newSpaces = `${spaces}    `;
    return `{\n${Object.entries(value).map(([key, val]) => {
      if (_.isObject(val)) {
        return `${newSpaces}${key}: ${toString(val, `${newSpaces}`)}\n`;
      }
      return `${newSpaces}${key}: ${val}\n`;
    }).join('')}${spaces}}`;
  }
  return value;
};
const stringify = (diff, spaces = '  ') => (
  diff.map(({
    key, status, value, newValue, children,
  }) => {
    const newSpaces = `${spaces}  `;
    const stringValue = toString(value, newSpaces);
    if (children) {
      const childrenStr = stringify(children, `${spaces}    `).join('');
      return `${spaces}  ${key}: {\n${childrenStr}${spaces}  }\n`;
    }
    if (status === 'changed') {
      return `${spaces}- ${key}: ${stringValue}\n${spaces}+ ${key}: ${toString(newValue, newSpaces)}\n`;
    }
    if (status === 'added') {
      return `${spaces}+ ${key}: ${stringValue}\n`;
    }
    if (status === 'deleted') {
      return `${spaces}- ${key}: ${stringValue}\n`;
    }
    return `${spaces}  ${key}: ${stringValue}\n`;
  })
);
export default (data) => `{\n${stringify(data).join('')}}`;
