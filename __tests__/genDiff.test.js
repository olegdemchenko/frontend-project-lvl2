import genDiff from '../src/genDiff';

const path = require('path');

const stringTemplate = 'common: { setting1: Value 1, - setting3: true, + setting3: { key: value }, setting6: { key: value, + ops: vops }, - setting2: 200, + follow: false, + setting4: blah blah, + setting5: { key5: value5 } }, group1: { - baz: bas, + baz: bars, foo: bar, - nest: { key: value }, + nest: str }, - group2: { abc: 12345 }, + group3: { fee: 100500 }';
const emptyBeforeTemplate = '+ common: { follow: false, setting1: Value 1, setting3: { key: value }, setting4: blah blah, setting5: { key5: value5 }, setting6: { key: value, ops: vops } }, + group1: { foo: bar, baz: bars, nest: str }, + group3: { fee: 100500 }';
const plainTemplate = 'Property "common.setting3" was changed from "true" to [complex value]\nProperty "common.setting6.ops" was added with value "vops"\nProperty "common.setting2" was deleted\nProperty "common.follow" was added with value "false"\nProperty "common.setting4" was added with value "blah blah"\nProperty "common.setting5" was added with value [complex value]\nProperty "group1.baz" was changed from "bas" to "bars"\nProperty "group1.nest" was changed from [complex value] to "str"\nProperty "group2" was deleted\nProperty "group3" was added with value [complex value]';
const jsonTemplate = '{"common":{"setting1":"Value 1","- setting3":true,"+ setting3":{"key":"value"},"setting6":{"key":"value","+ ops":"vops"},"- setting2":200,"+ follow":false,"+ setting4":"blah blah","+ setting5":{"key5":"value5"}},"group1":{"- baz":"bas","+ baz":"bars","foo":"bar","- nest":{"key":"value"},"+ nest":"str"},"- group2":{"abc":12345},"+ group3":{"fee":100500}}';
const getFilePath = (fileName) => path.join(__dirname, '/../', '__fixtures__/', fileName);

test.each([
  [
    getFilePath('before.json'),
    getFilePath('after.json'),
    stringTemplate,
  ],
  [
    getFilePath('emptyBefore.json'),
    getFilePath('after.json'),
    emptyBeforeTemplate,
  ],
  [
    getFilePath('emptyBefore.json'),
    getFilePath('emptyAfter.json'),
    '',
  ],
  [
    getFilePath('before.yml'),
    getFilePath('after.yml'),
    stringTemplate,
  ],
  [
    getFilePath('before.ini'),
    getFilePath('after.ini'),
    stringTemplate,
  ],
])('testing with string format', (a, b, expected) => {
  expect(genDiff(a, b)).toBe(expected);
});
test.each([
  [
    getFilePath('before.json'),
    getFilePath('after.json'),
    plainTemplate,
  ],
  [
    getFilePath('before.yml'),
    getFilePath('after.yml'),
    plainTemplate,
  ],
  [
    getFilePath('before.ini'),
    getFilePath('after.ini'),
    plainTemplate,
  ],
])('testing with plain format', (a, b, expected) => {
  expect(genDiff(a, b, 'plain')).toBe(expected);
});
test.each([
  [
    getFilePath('before.json'),
    getFilePath('after.yml'),
    jsonTemplate,
  ],
  [
    getFilePath('before.yml'),
    getFilePath('after.ini'),
    jsonTemplate,
  ],
  [
    getFilePath('before.ini'),
    getFilePath('after.json'),
    jsonTemplate,
  ],
])('testing with json format', (a, b, expected) => {
  expect(genDiff(a, b, 'json')).toBe(expected);
});
