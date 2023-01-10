import plainGenerateOutput from './plain.js';
import stylishGenerateOutput from './stylish.js';

export default function generateOutput(data1, data2, compareData, format) {
  let result;
  switch (format) {
    case 'plain': {
      result = plainGenerateOutput(data1, data2, compareData);
      break;
    }
    default: {
      result = stylishGenerateOutput(data1, data2, compareData);
      break;
    }
  }
  return result;
}
