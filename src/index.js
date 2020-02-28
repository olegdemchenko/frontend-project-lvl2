#!/usr/bin/env node
import analyzeData from './analyzeData';

const programm = require('commander');

programm.version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, -- format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action(analyzeData)
  .parse(process.argv);
export default analyzeData;
