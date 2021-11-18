import { Command } from 'commander/esm.mjs';

const run = () => {
  const program = new Command();
  program
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .argument('filepath1')
    .argument('filepath2')
    .version('0.0.1');
  program.parse(process.argv);
};

export default run;
