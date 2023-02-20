import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parseData from './parser.js';
import generateOutput from './formatters/index.js';

const getDataFromFile = (filePath) => {
  const file = fs.readFileSync(filePath, 'utf-8');
  return parseData(file, path.extname(filePath));
};

const compare = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));
  return keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (!_.has(data2, key)) {
      return {
        key,
        status: 'removed',
        value1,
      };
    }
    if (_.has(data2, key) && !_.has(data1, key)) {
      return {
        key,
        status: 'added',
        value2,
      };
    }
    if (value1 === value2) {
      return {
        key,
        status: 'unchanged',
        value1,
        value2,
      };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        key,
        status: 'object',
        children: compare(value1, value2),
      };
    }
    return {
      key,
      status: 'changed',
      value1,
      value2,
    };
  });
};

const genDiff = (filePath1, filePath2, format) => {
  const data1 = getDataFromFile(filePath1);
  const data2 = getDataFromFile(filePath2);
  const compareData = compare(data1, data2);
  return generateOutput(compareData, format);
};

export { genDiff, compare, getDataFromFile };
