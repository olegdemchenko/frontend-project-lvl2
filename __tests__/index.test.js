import genDiff from '../src/genDiff';

const path = require('path');

const template = '{ common: { setting1: Value 1 - setting3: true + setting3: { key: value } setting6: { key: value + ops: vops } - setting2: 200 + follow: false + setting4: blah blah + setting5: { key5: value5 } } group1: { - baz: bas + baz: bars foo: bar - nest: { key: value } + nest: str } - group2: { abc: 12345 } + group3: { fee: 100500 } }';
const emptyBeforeTemplate = '{ + common: { follow: false setting1: Value 1 setting3: { key: value } setting4: blah blah setting5: { key5: value5 } setting6: { key: value ops: vops } } + group1: { foo: bar baz: bars nest: str } + group3: { fee: 100500 } }';
const getFilePath = (fileName) => path.join(__dirname, '/../', '__fixtures__/', fileName);

test.each([
  [
    getFilePath('before.json'),
    getFilePath('after.json'),
    template,
  ],
  [
    getFilePath('emptyBefore.json'),
    getFilePath('after.json'),
    emptyBeforeTemplate,
  ],
  [
    getFilePath('emptyBefore.json'),
    getFilePath('emptyAfter.json'),
    '{ }',
  ],
  [
    getFilePath('before.yml'),
    getFilePath('after.yml'),
    template,
  ],
  [
    getFilePath('before.ini'),
    getFilePath('after.ini'),
    template,
  ],
])('%s %s', (a, b, expected) => {
  expect(genDiff(a, b)).toBe(expected);
});
