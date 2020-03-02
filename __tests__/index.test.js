import analyzeData from '../src/analyzeData';

test('main functionality', () => {
  expect(analyzeData(
    `${__dirname}/fixtures/main/before.json`,
    `${__dirname}/fixtures/main/after.json`,
  )).toEqual(
    '{"host":"hexlet.io","+ timeout":20,"- timeout":50,"- proxy":"123.234.53.22","- follow":false,"+ verbose":true}',
  );
  expect(analyzeData(
    `${__dirname}/fixtures/bothEmpty/before.json`,
    `${__dirname}/fixtures/bothEmpty/after.json`,
  )).toEqual('{}');
  expect(analyzeData(
    `${__dirname}/fixtures/beforeEmpty/before.json`,
    `${__dirname}/fixtures/beforeEmpty/after.json`,
  )).toEqual('{"+ timeout":20,"+ verbose":true,"+ host":"hexlet.io"}');
});
