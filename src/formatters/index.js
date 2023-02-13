import plainGenerateOutput from './plain.js';
import stylishGenerateOutput from './stylish.js';
import jsonGenerateOutput from './json.js';

export default function generateOutput(data1, data2, compareData, format) {
  switch (format) {
    case 'plain': {
      return plainGenerateOutput(data1, data2, compareData).slice(0, -1);
    }
    case 'json': {
      return jsonGenerateOutput(data1, data2, compareData);
    }
    default: {
      return stylishGenerateOutput(data1, data2, compareData).slice(0, -1);
    }
  }
}
