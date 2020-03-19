import genDiff from '../src/genDiff';

const path = require('path');
const fs = require('fs');

const getFilePath = (fileName) => path.join(__dirname, '/../', '__fixtures__/', fileName);
const readFile = (fileName) => fs.readFileSync(getFilePath(fileName), 'utf-8').trim();

test.each([
  [
    getFilePath('before.json'),
    getFilePath('after.json'),
    readFile('stringTemplate.txt'),
  ],
  [
    getFilePath('emptyBefore.json'),
    getFilePath('after.json'),
    readFile('emptyBeforeTemplate.txt'),
  ],
  [
    getFilePath('emptyBefore.json'),
    getFilePath('emptyAfter.json'),
    '',
  ],
  [
    getFilePath('before.yml'),
    getFilePath('after.yml'),
    readFile('stringTemplate.txt'),
  ],
  [
    getFilePath('before.ini'),
    getFilePath('after.ini'),
    readFile('stringTemplate.txt'),
  ],
])('testing with string format', (a, b, expected) => {
  expect(genDiff(a, b)).toBe(expected);
});
test.each([
  [
    getFilePath('before.yml'),
    getFilePath('after.json'),
    readFile('plainTemplate.txt'),
  ],
  [
    getFilePath('emptyBefore.json'),
    getFilePath('after.ini'),
    readFile('emptyBeforePlainTemplate.txt'),
  ],
  [
    getFilePath('before.ini'),
    getFilePath('after.json'),
    readFile('plainTemplate.txt'),
  ],
])('testing with plain format', (a, b, expected) => {
  expect(genDiff(a, b, 'plain')).toBe(expected);
});
test.each([
  [
    getFilePath('before.json'),
    getFilePath('after.yml'),
    readFile('jsonTemplate.txt'),
  ],
  [
    getFilePath('before.yml'),
    getFilePath('after.ini'),
    readFile('jsonTemplate.txt'),
  ],
  [
    getFilePath('before.ini'),
    getFilePath('after.json'),
    readFile('jsonTemplate.txt'),
  ],
])('testing with json format', (a, b, expected) => {
  expect(genDiff(a, b, 'json')).toBe(expected);
});
