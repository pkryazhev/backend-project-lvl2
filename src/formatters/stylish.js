import _ from 'lodash';

const generateIndent = (quantity) => _.repeat('    ', quantity);

const printValue = (key, value, sign, count = 1) => {
  if (!_.isObject(value)) {
    return `${generateIndent(count)}  ${sign} ${key}: ${value}`;
  }
  const keys = Object.keys(value);
  const result = keys.map((k) => printValue(k, value[k], ' ', count + 1));
  return `${generateIndent(count)}  ${sign} ${key}: {\n${result.join('\n')}\n${generateIndent(count + 1)}}`;
};

const printString = (data, counter = 1) => {
  const {
    key, status, value1, value2,
  } = data;
  switch (status) {
    case 'unchanged': {
      return `${printValue(key, value1, ' ', counter)}`;
    }
    case 'removed': {
      return `${printValue(key, value1, '-', counter)}`;
    }
    case 'added': {
      return `${printValue(key, value2, '+', counter)}`;
    }
    case 'changed': {
      return `${printValue(key, value1, '-', counter)}\n${printValue(key, value2, '+', counter)}`;
    }
    default: {
      throw new Error();
    }
  }
};

const stylishGenerateOutput = (compareData, counter = 0) => {
  const result = compareData.map((data) => {
    const { status, key, children } = data;
    switch (status) {
      case 'unchanged': {
        return printString(data, counter);
      }
      case 'removed': {
        return printString(data, counter);
      }
      case 'added': {
        return printString(data, counter);
      }
      case 'changed': {
        return `${printString(data, counter)}`;
      }
      case 'object': {
        return `${generateIndent(counter + 1)}${key}: ${stylishGenerateOutput(children, counter + 1)}`;
      }
      default: {
        throw new Error();
      }
    }
  });
  return `{\n${result.join('\n')}\n${generateIndent(counter)}}`;
};

export default stylishGenerateOutput;
