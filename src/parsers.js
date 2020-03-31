import jsYaml from 'js-yaml';
import ini from 'ini';
import fixNumbers from './fixNumbers';

export default (extension, data) => {
  switch (extension) {
    case '.json': {
      return JSON.parse(data);
    }
    case '.yaml':
    case '.yml': {
      return jsYaml.safeLoad(data);
    }
    case '.ini': {
      const parsedFile = ini.parse(data);
      return fixNumbers(parsedFile);
    }
    default:
      throw new Error(`Extension ${extension} is not supported`);
  }
};
