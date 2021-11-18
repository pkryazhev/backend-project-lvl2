import yaml from 'js-yaml';

const parseData = (file, ext) => {
  let data;
  switch (ext) {
    case '.json': {
      data = JSON.parse(file);
      break;
    }
    case '.yml':
    case '.yaml': {
      data = yaml.load(file);
      break;
    }
    default:
      throw new Error('Wrong file format');
  }
  return data;
};

export default parseData;
