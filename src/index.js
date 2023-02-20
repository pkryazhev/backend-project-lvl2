import generateOutput from './formatters/index.js';
import { compare, getDataFromFile } from './compareFile.js';

export default (filePath1, filePath2, format = 'stylish') => {
  const data1 = getDataFromFile(filePath1);
  const data2 = getDataFromFile(filePath2);
  const compareData = compare(data1, data2);
  return generateOutput(compareData, format);
};
