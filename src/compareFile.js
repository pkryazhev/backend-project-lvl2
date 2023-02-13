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
  const result = {};
  keys.forEach((key) => {
    if (!_.has(data1, key)) {
      result[key] = 'only 2';
    } else if (!_.has(data2, key)) {
      result[key] = 'only 1';
    } else if (data1[key] === data2[key]) {
      result[key] = 'equal';
    } else if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      result[key] = compare(data1[key], data2[key]);
    } else if (data1[key] !== data2[key]) {
      result[key] = 'not equal';
    }
  });
  return result;
};

const genDiff = (filePath1, filePath2, format) => {
  const data1 = getDataFromFile(filePath1);
  const data2 = getDataFromFile(filePath2);
  const compareData = compare(data1, data2);
  return generateOutput(data1, data2, compareData, format);
};

export { genDiff, compare, getDataFromFile };
