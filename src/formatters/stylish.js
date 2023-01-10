import _ from 'lodash';

const generateIndent = (quantity) => {
  let result = '';
  for (let i = 0; i < quantity; i += 1) {
    result = `${result}    `;
  }
  return result;
};

const printString = (key, value, symbol, count = 0) => {
  if (!_.isObject(value)) {
    return `${generateIndent(count)}  ${symbol} ${key}: ${value}\n`;
  }
  let result = `${generateIndent(count)}  ${symbol} ${key}: {\n`;
  const keys = Object.keys(value);
  keys.forEach((k) => {
    if (_.isObject(value[k])) {
      result += printString(k, value[k], ' ', count + 1);
    } else {
      result += `${generateIndent(count + 1)}    ${k}: ${value[k]}\n`;
    }
  });
  result += `${generateIndent(count + 1)}}\n`;
  return result;
};

const stylishGenerateOutput = (data1, data2, compareResults, counter = 0) => {
  const keys = Object.keys(compareResults);
  let result = '{\n';
  keys.forEach((key) => {
    const value = compareResults[key];
    switch (value) {
      case 'equal': {
        result += printString(key, data1[key], ' ', counter);
        break;
      }
      case 'only 1': {
        result += printString(key, data1[key], '-', counter);
        break;
      }
      case 'only 2': {
        result += printString(key, data2[key], '+', counter);
        break;
      }
      case 'not equal': {
        result += printString(key, data1[key], '-', counter);
        result += printString(key, data2[key], '+', counter);
        break;
      }
      default: {
        result += `${generateIndent(counter + 1)}${key}: ${stylishGenerateOutput(data1[key], data2[key], compareResults[key], counter + 1)}`;
        break;
      }
    }
  });
  result += `${generateIndent(counter)}}\n`;
  return result;
};

export default stylishGenerateOutput;
