import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { genDiff, compare, getPrintData } from '../src/compareFile';

const printResult = '{\n'
  + '   host: hexlet.io\n'
  + ' - timeout: 50\n'
  + ' + timeout: 20\n'
  + ' - proxy: 123.234.53.22\n'
  + ' - follow: false\n'
  + ' + verbose: true\n'
  + '}';

const timeoutPart = '- timeout: 50\n + timeout: 20';
const hostPart = '  host: hexlet.io';
const proxyPart = '- proxy: 123.234.53.22';
const verbosePart = '+ verbose: true';
const followPart = '- follow: false';

const checkAllParts = (result) => {
  expect(result.includes(timeoutPart)).toBeTruthy();
  expect(result.includes(hostPart)).toBeTruthy();
  expect(result.includes(proxyPart)).toBeTruthy();
  expect(result.includes(verbosePart)).toBeTruthy();
  expect(result.includes(followPart)).toBeTruthy();
  expect(result.length).toEqual(5);
};

test('compare json files with absolute path test', () => {
  // arrange
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filepath1 = path.join(__dirname, '__fixtures__', 'example.json');
  const filepath2 = path.join(
    __dirname,
    '__fixtures__',
    'examples',
    'example2.json',
  );
  // action
  const result = compare(filepath1, filepath2);
  // assert
  checkAllParts(result);
});

test('compare yaml files with relative path test', () => {
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
  const result = compare(filepath1, filepath2);
  // assert
  checkAllParts(result);
});

test('generate result output', () => {
  // arrange
  const compareData = [
    '  host: hexlet.io',
    '- timeout: 50\n + timeout: 20',
    '- proxy: 123.234.53.22',
    '- follow: false',
    '+ verbose: true',
  ];
  // action
  const result = getPrintData(compareData);
  // assert
  expect(result).toEqual(printResult);
});

test('check genDiff', () => {
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
  expect(result.length).toEqual(110);
});

test('incorrect type of file', () => {
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
    'txtExample.txt',
  );
  // action
  function triggerError() {
    compare(filepath1, filepath2);
  }
  // assert
  expect(triggerError).toThrowError('Wrong file format');
});
