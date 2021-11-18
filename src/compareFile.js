import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';
import parseData from './parser.js';

const getDataFromFile = (filePath) => {
  const file = readFileSync(filePath, 'utf-8');
  return parseData(file, path.extname(filePath));
};

const compare = (filePath1, filePath2) => {
  const fileData1 = getDataFromFile(filePath1);
  const fileData2 = getDataFromFile(filePath2);
  const keys1 = Object.keys(fileData1);
  const keys2 = Object.keys(fileData2);

  const checkFirstObject = (acc, key) => {
    if (!_.has(fileData2, key)) {
      acc.push(`- ${key}: ${fileData1[key]}`);
    } else if (fileData1[key] !== fileData2[key]) {
      acc.push(`- ${key}: ${fileData1[key]}`);
      acc.push(`+ ${key}: ${fileData2[key]}`);
    } else {
      acc.push(`  ${key}: ${fileData1[key]}`);
    }
    return acc;
  };

  const checkSecondObject = (acc, key) => {
    if (!_.has(fileData1, key)) {
      acc.push(`+ ${key}: ${fileData2[key]}`);
    }
    return acc;
  };

  const firstFileResult = keys1.reduce(checkFirstObject, []);
  return keys2.reduce(checkSecondObject, firstFileResult);
};

const getPrintData = (compareData) => {
  let result = '{';
  compareData.forEach((str, index) => {
    result += `\n ${compareData[index]}`;
  });
  result += '\n}';
  return result;
};

const genDiff = (filePath1, filePath2) => {
  const compareData = compare(filePath1, filePath2);
  return getPrintData(compareData);
};

export default genDiff;
