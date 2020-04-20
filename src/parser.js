import jsYaml from 'js-yaml';
import ini from 'ini';
import fixNumbers from './fixNumbers';

export default (format, data) => {
  switch (format) {
    case 'json': {
      return JSON.parse(data);
    }
    case 'yaml':
    case 'yml': {
      return jsYaml.safeLoad(data);
    }
    case 'ini': {
      const convertedData = ini.parse(data);
      return fixNumbers(convertedData);
    }
    default:
      throw new Error(`Format ${format} is not supported`);
  }
};
