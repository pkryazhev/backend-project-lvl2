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

const printAddedString = (path, key, value) => `Property '${path}${key}' was added with value: ${printValue(value)}`;

const printDeletedString = (path, key) => `Property '${path}${key}' was removed`;

const printUpdatedString = (path, key, value1, value2) => `Property '${path}${key}' was updated. From ${printValue(value1)} to ${printValue(value2)}`;

const plainGenerateOutput = (compareData, path = '') => {
  const result = compareData.filter((data) => data.status !== 'unchanged').map((data) => {
    const {
      status, key, value1, value2,
    } = data;
    switch (status) {
      case 'removed': {
        return printDeletedString(path, key);
      }
      case 'added': {
        return printAddedString(path, key, value2);
      }
      case 'changed': {
        return printUpdatedString(path, key, value1, value2);
      }
      case 'object': {
        return plainGenerateOutput(data.children, `${path}${key}.`);
      }
      default: {
        throw new Error('wrong status!');
      }
    }
  });
  return result.join('\n');
};
export default plainGenerateOutput;
