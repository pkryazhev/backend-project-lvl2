import _ from 'lodash';

const generateIndent = (quantity) => _.repeat('    ', quantity);

const printString = (key, value, symbol, count = 0) => {
  if (!_.isObject(value)) {
    return `${generateIndent(count)}  ${symbol} ${key}: ${value}\n`;
  }
  const result = [];
  result.push(`${generateIndent(count)}  ${symbol} ${key}: {\n`);
  const keys = Object.keys(value);
  keys.forEach((k) => {
    if (_.isObject(value[k])) {
      result.push(printString(k, value[k], ' ', count + 1));
    } else {
      result.push(`${generateIndent(count + 1)}    ${k}: ${value[k]}\n`);
    }
  });
  result.push(`${generateIndent(count + 1)}}\n`);
  return result.join('');
};

const stylishGenerateOutput = (data1, data2, compareResults, counter = 0) => {
  const keys = Object.keys(compareResults);
  const result = ['{\n'];
  keys.forEach((key) => {
    const value = compareResults[key];
    switch (value) {
      case 'equal': {
        result.push(printString(key, data1[key], ' ', counter));
        break;
      }
      case 'only 1': {
        result.push(printString(key, data1[key], '-', counter));
        break;
      }
      case 'only 2': {
        result.push(printString(key, data2[key], '+', counter));
        break;
      }
      case 'not equal': {
        result.push(printString(key, data1[key], '-', counter));
        result.push(printString(key, data2[key], '+', counter));
        break;
      }
      default: {
        result.push(`${generateIndent(counter + 1)}${key}: ${stylishGenerateOutput(data1[key], data2[key], compareResults[key], counter + 1)}`);
        break;
      }
    }
  });
  result.push(`${generateIndent(counter)}}\n`);
  return result.join('');
};

export default stylishGenerateOutput;
