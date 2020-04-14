import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const getFilePath = (fileName) => {
  const fixturesPath = `${__dirname}/../__fixtures__/`;
  return path.join(fixturesPath, fileName);
};
const readFile = (fileName) => fs.readFileSync(getFilePath(fileName), 'utf-8').trim();
let tapTemplate;
let plainTemplate;
let jsonTemplate;

beforeAll(() => {
  tapTemplate = readFile('tapTemplate.txt');
  plainTemplate = readFile('plainTemplate.txt');
  jsonTemplate = readFile('jsonTemplate.txt');
});

test('testing main functionality', () => {
  expect(genDiff(getFilePath('before.json'), getFilePath('after.yml'))).toBe(tapTemplate);
  expect(genDiff(getFilePath('before.ini'), getFilePath('after.json'), 'plain')).toBe(plainTemplate);
  expect(genDiff(getFilePath('before.yml'), getFilePath('after.ini'), 'json')).toBe(jsonTemplate);
});
test('testing empty files', () => {
  expect(genDiff(getFilePath('emptyBefore.json'), getFilePath('emptyAfter.json'))).toBe('{\n\n}');
});
