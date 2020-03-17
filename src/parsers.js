import fixNumbers from './fixNumbers';

const jsYaml = require('js-yaml');
const ini = require('ini');


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
      throw new Error('This format is not supported');
  }
};
