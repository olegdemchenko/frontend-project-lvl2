import jsYaml from 'js-yaml';
import ini from 'ini';
import fixNumbers from './fixNumbers';

export default (type, file) => {
  switch (type) {
    case '.json': {
      return JSON.parse(file);
    }
    case '.yml': {
      return jsYaml.safeLoad(file);
    }
    case '.yaml': {
      return jsYaml.safeLoad(file);
    }
    case '.ini': {
      const parcedFile = ini.parse(file);
      return fixNumbers(parcedFile);
    }
    default:
      throw new Error(`Type ${type} is not supported`);
  }
};
