#!/usr/bin/env node
import program from 'commander';
import genDiff from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .option('-c, --format [type]', 'Add type of output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .version('0.0.1')
  .action((filepath1, filepath2, option) => {
    console.log(genDiff(filepath1, filepath2, option.format));
  })
  .parse(process.argv);
