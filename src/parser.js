import yaml from 'js-yaml';

const parseData = (file, ext) => {
  switch (ext) {
    case '.json': {
      return JSON.parse(file);
    }
    case '.yml':
    case '.yaml': {
      return yaml.load(file);
    }
    default:
      throw new Error('Wrong file format');
  }
};

export default parseData;
