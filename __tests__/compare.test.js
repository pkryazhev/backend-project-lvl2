import { test, expect } from '@jest/globals';
import path from 'path';
import { genDiff, getDataFromFile } from '../src/compareFile';

const printResult = '{\n'
  + '    common: {\n'
  + '      + follow: false\n'
  + '        setting1: Value 1\n'
  + '      - setting2: 200\n'
  + '      - setting3: true\n'
  + '      + setting3: {\n'
  + '            key: value\n'
  + '        }\n'
  + '      + setting4: blah blah\n'
  + '      + setting5: {\n'
  + '            key5: value5\n'
  + '        }\n'
  + '        setting6: {\n'
  + '            doge: {\n'
  + '              - wow: too much\n'
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
  + '    group4: {\n'
  + '      - default: null\n'
  + '      + default: \n'
  + '      - foo: 0\n'
  + '      + foo: null\n'
  + '      - isNested: false\n'
  + '      + isNested: none\n'
  + '      + key: false\n'
  + '        nest: {\n'
  + '          - bar: \n'
  + '          + bar: 0\n'
  + '          - isNested: true\n'
  + '        }\n'
  + '      + someKey: true\n'
  + '      - type: bas\n'
  + '      + type: bar\n'
  + '    }\n'
  + '    language: js\n'
  + '}';

const plainPrintResult = "Property 'common.follow' was added with value: false\n"
  + "Property 'common.setting2' was removed\n"
  + "Property 'common.setting3' was updated. From true to [complex value]\n"
  + "Property 'common.setting4' was added with value: 'blah blah'\n"
  + "Property 'common.setting5' was added with value: [complex value]\n"
  + "Property 'common.setting6.doge.wow' was updated. From 'too much' to 'so much'\n"
  + "Property 'common.setting6.ops' was added with value: 'vops'\n"
  + "Property 'group1.baz' was updated. From 'bas' to 'bars'\n"
  + "Property 'group1.nest' was updated. From [complex value] to 'str'\n"
  + "Property 'group2' was removed\n"
  + "Property 'group3' was added with value: [complex value]\n"
  + "Property 'group4.default' was updated. From null to ''\n"
  + "Property 'group4.foo' was updated. From '0' to null\n"
  + "Property 'group4.isNested' was updated. From false to 'none'\n"
  + "Property 'group4.key' was added with value: false\n"
  + "Property 'group4.nest.bar' was updated. From '' to '0'\n"
  + "Property 'group4.nest.isNested' was removed\n"
  + "Property 'group4.someKey' was added with value: true\n"
  + "Property 'group4.type' was updated. From 'bas' to 'bar'";

const jsonPrintResult = '{"common":{"follow":"only 2","setting1":"equal","setting2":"only 1","setting3":"not equal","setting4":"only 2","setting5":"only 2","setting6":{"doge":{"wow":"not equal"},"key":"equal","ops":"only 2"}},"group1":{"baz":"not equal","foo":"equal","nest":"not equal"},"group2":"only 1","group3":"only 2","group4":{"default":"not equal","foo":"not equal","isNested":"not equal","key":"only 2","nest":{"bar":"not equal","isNested":"only 1"},"someKey":"only 2","type":"not equal"},"language":"equal"}';

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

test('check genDiff with plain format', () => {
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
  const result = genDiff(filepath1, filepath2, 'plain');
  // assert
  expect(result).toEqual(plainPrintResult);
});

test('check genDiff with json format', () => {
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
  const result = genDiff(filepath1, filepath2, 'json');
  // assert
  expect(result).toEqual(jsonPrintResult);
});
