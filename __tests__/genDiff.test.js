import path from 'path';
import fs from 'fs';
import genDiff from '../src/bin';

const fixturesPath = `${__dirname}/../__fixtures__/`;
const getFilePath = (fileName) => path.join(fixturesPath, fileName);
const readFile = (fileName) => fs.readFileSync(getFilePath(fileName), 'utf-8').trim();
let stringTemplate;
let emptyBeforeTemplate;
let plainTemplate;
let emptyBeforePlainTemplate;
let jsonTemplate;

beforeAll(() => {
  stringTemplate = readFile('stringTemplate.txt');
  emptyBeforeTemplate = readFile('emptyBeforeTemplate.txt');
  plainTemplate = readFile('plainTemplate.txt');
  emptyBeforePlainTemplate = readFile('emptyBeforePlainTemplate.txt');
  jsonTemplate = readFile('jsonTemplate.txt');
});

test.each([
  [
    'before.json',
    'after.json',
  ],
  [
    'before.yml',
    'after.yml',
  ],
  [
    'before.ini',
    'after.ini',
  ],
])('testing string format ', (a, b) => {
  expect(genDiff(`${fixturesPath}${a}`, `${fixturesPath}${b}`)).toBe(stringTemplate);
});
test.each([
  [
    'before.yml',
    'after.json',
  ],
  [
    'before.ini',
    'after.json',
  ],
])('testing with plain format', (a, b) => {
  expect(genDiff(`${fixturesPath}${a}`, `${fixturesPath}${b}`, 'plain')).toBe(plainTemplate);
});
test.each([
  [
    'before.json',
    'after.yml',
  ],
  [
    'before.yml',
    'after.ini',
  ],
  [
    'before.ini',
    'after.json',
  ],
])('testing with json format', (a, b) => {
  expect(genDiff(`${fixturesPath}${a}`, `${fixturesPath}${b}`, 'json')).toBe(jsonTemplate);
});
test('testing empty files', () => {
  expect(genDiff(`${fixturesPath}emptyBefore.json`, `${fixturesPath}emptyAfter.json`)).toBe('{\n}');
  expect(genDiff(`${fixturesPath}emptyBefore.json`, `${fixturesPath}after.json`)).toBe(emptyBeforeTemplate);
  expect(genDiff(`${fixturesPath}emptyBefore.json`, `${fixturesPath}after.json`, 'plain')).toBe(emptyBeforePlainTemplate);
});
