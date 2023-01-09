import { Command } from 'commander/esm.mjs';
import { genDiff } from './compareFile.js';

const run = () => {
  const program = new Command();
  program
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .option('-c, --format <type>', 'Add type of output format', 'stylish')
    .arguments('<filepath1> <filepath2>')
    .version('0.0.1')
    .action((filepath1, filepath2, option) => {
      console.log(genDiff(filepath1, filepath2, option.format));
    });
  program.parse(process.argv);
};

export default run;
