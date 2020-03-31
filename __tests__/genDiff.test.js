import path from 'path';
import fs from 'fs';
import genDiff from '../src';

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


test('testing main functionality', () => {
  expect(genDiff(`${fixturesPath}before.json`, `${fixturesPath}after.yml`)).toBe(stringTemplate);
  expect(genDiff(`${fixturesPath}before.ini`, `${fixturesPath}after.json`, 'plain')).toBe(plainTemplate);
  expect(genDiff(`${fixturesPath}before.yml`, `${fixturesPath}after.ini`, 'json')).toBe(jsonTemplate);
});
test('testing empty files', () => {
  expect(genDiff(`${fixturesPath}emptyBefore.json`, `${fixturesPath}emptyAfter.json`)).toBe('{\n}');
  expect(genDiff(`${fixturesPath}emptyBefore.json`, `${fixturesPath}after.json`)).toBe(emptyBeforeTemplate);
  expect(genDiff(`${fixturesPath}emptyBefore.json`, `${fixturesPath}after.json`, 'plain')).toBe(emptyBeforePlainTemplate);
});
