import { test, expect } from '@jest/globals';
import path from 'path';
import { genDiff, getDataFromFile } from '../src/compareFile';

const printResult = '{\n'
  + '    common: {\n'
  + '      + follow: false\n'
  + '        setting1: Value 1\n'
  + '      - setting2: 200\n'
  + '      - setting3: true\n'
  + '      + setting3: null\n'
  + '      + setting4: blah blah\n'
  + '      + setting5: {\n'
  + '            key5: value5\n'
  + '        }\n'
  + '        setting6: {\n'
  + '            doge: {\n'
  + '              - wow: \n'
  + '              + wow: so much\n'
  + '            }\n'
  + '            key: value\n'
  + '          + ops: vops\n'
  + '        }\n'
  + '    }\n'
  + '    group1: {\n'
  + '      - baz: bas\n'
  + '      + baz: bars\n'
  + '        foo: bar\n'
  + '      - nest: {\n'
  + '            key: value\n'
  + '        }\n'
  + '      + nest: str\n'
  + '    }\n'
  + '  - group2: {\n'
  + '        abc: 12345\n'
  + '        deep: {\n'
  + '            id: 45\n'
  + '        }\n'
  + '    }\n'
  + '  + group3: {\n'
  + '        deep: {\n'
  + '            id: {\n'
  + '                number: 45\n'
  + '            }\n'
  + '        }\n'
  + '        fee: 100500\n'
  + '    }\n'
  + '}\n';

test('check genDiff via yaml', () => {
  // arrange
  const filepath1 = path.join(
    '__tests__',
    '__fixtures__',
    'examples',
    'yamlExample1.yml',
  );
  const filepath2 = path.join(
    '__tests__',
    '__fixtures__',
    'examples',
    'yamlExample2.yaml',
  );
  // action
  const result = genDiff(filepath1, filepath2);
  // assert
  expect(result).toEqual(printResult);
});

test('check genDiff via json', () => {
  // arrange
  const filepath1 = path.join(
    '__tests__',
    '__fixtures__',
    'examples',
    'example1.json',
  );
  const filepath2 = path.join(
    '__tests__',
    '__fixtures__',
    'examples',
    'example2.json',
  );
  // action
  const result = genDiff(filepath1, filepath2);
  // assert
  expect(result).toEqual(printResult);
});

test('incorrect type of file', () => {
  // arrange
  const filepath2 = path.join(
    '__tests__',
    '__fixtures__',
    'examples',
    'txtExample.txt',
  );
  // action
  function triggerError() {
    getDataFromFile(filepath2);
  }
  // assert
  expect(triggerError).toThrowError('Wrong file format');
});
