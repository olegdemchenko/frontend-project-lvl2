import isObject from '../utils';

const stringify = (diff, spaces = '') => (
  diff.reduce((acc, [key, value]) => {
    const newSpaces = `${spaces}  `;
    if (isObject(value)) {
      const newAcc = Array.isArray(value) ? stringify(value, `${newSpaces}  `) : stringify(Object.entries(value), `${newSpaces}    `);
      const newStr = `${newSpaces}${key}: {\n${newAcc.join('')}${newSpaces}  }\n`;
      return [...acc, newStr];
    }
    return [...acc, `${newSpaces}${key}: ${value}\n`];
  }, [])
);
export default (data) => `{\n${stringify(data).join('')}}`;
