import plainGenerateOutput from './plain.js';
import stylishGenerateOutput from './stylish.js';
import jsonGenerateOutput from './json.js';

export default function generateOutput(compareData, format) {
  switch (format) {
    case 'plain': {
      return plainGenerateOutput(compareData);
    }
    case 'json': {
      return jsonGenerateOutput(compareData);
    }
    default: {
      return stylishGenerateOutput(compareData);
    }
  }
}
