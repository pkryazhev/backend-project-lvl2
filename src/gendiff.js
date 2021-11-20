import { Command } from 'commander/esm.mjs';
import { genDiff } from './compareFile.js';

const run = () => {
  const program = new Command();
  program
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .version('0.0.1')
    .action((filepath1, filepath2) => {
      console.log(genDiff(filepath1, filepath2));
    });
  program.parse(process.argv);
};

export default run;
