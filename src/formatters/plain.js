import _ from 'lodash';

const printValue = (value) => {
  if (value === true || value === false || value === null) {
    return `${value}`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (Number.isInteger(value)) {
    return `${value}`;
  }
  return `'${value}'`;
};

const printAddedString = (path, key, value) => `Property '${path}${key}' was added with value: ${printValue(value)}\n`;

const printDeletedString = (path, key) => `Property '${path}${key}' was removed\n`;

const printUpdatedString = (path, key, value1, value2) => `Property '${path}${key}' was updated. From ${printValue(value1)} to ${printValue(value2)}\n`;

const plainGenerateOutput = (object1, object2, testResult, path = '') => {
  const keys = Object.keys(testResult);
  const result = [];
  keys.forEach((key) => {
    const value = testResult[key];
    switch (value) {
      case 'equal': {
        break;
      }
      case 'not equal': {
        result.push(printUpdatedString(path, key, object1[key], object2[key]));
        break;
      }
      case 'only 1': {
        result.push(printDeletedString(path, key));
        break;
      }
      case 'only 2': {
        result.push(printAddedString(path, key, object2[key]));
        break;
      }
      default: {
        result.push(plainGenerateOutput(object1[key], object2[key], testResult[key], `${path}${key}.`));
        break;
      }
    }
  });
  return result.join('');
};
export default plainGenerateOutput;
