import _ from 'lodash';

const prepareData = (collection, spaces) => {
  if (Array.isArray(collection)) {
    return [collection, `${spaces}  `];
  }
  return [Object.entries(collection), `${spaces}    `];
};
const stringify = (diff, spaces = '') => (
  diff.reduce((acc, [key, value]) => {
    const newSpaces = `${spaces}  `;
    if (_.isObject(value)) {
      const [newValue, newValueSpaces] = prepareData(value, newSpaces);
      const newAcc = stringify(newValue, newValueSpaces);
      const newStr = `${newSpaces}${key}: {\n${newAcc.join('')}${newSpaces}  }\n`;
      return [...acc, newStr];
    }
    return [...acc, `${newSpaces}${key}: ${value}\n`];
  }, [])
);
export default (data) => `{\n${stringify(data).join('')}}`;
