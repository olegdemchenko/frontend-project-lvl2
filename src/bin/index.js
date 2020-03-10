#!/usr/bin/env node
import genDiff from '../genDiff';

const programm = require('commander');


programm.version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, -- format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action(genDiff)
  .parse(process.argv);
console.log(programm);
export default genDiff;
