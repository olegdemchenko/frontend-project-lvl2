import genDiff from './src/genDiff';

const doc = genDiff(`${__dirname}/__tests__/fixtures/json/emptyBefore.json`, `${__dirname}/__tests__/fixtures/json/after.json`);
console.log(doc);
