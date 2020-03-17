#!/usr/bin/env node
import genDiff from '../genDiff';

const programm = require('commander');

programm.version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stringify')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => (
    console.log(genDiff(firstConfig, secondConfig, programm.format))
  ))
  .parse(process.argv);
export default genDiff;
