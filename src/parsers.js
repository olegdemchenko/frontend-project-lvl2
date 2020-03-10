const jsYaml = require('js-yaml');
const ini = require('ini');

const parsers = {
  '.json': (file) => JSON.parse(file),
  '.yml': (file) => jsYaml.safeLoad(file),
  '.yaml': (file) => jsYaml.safeLoad(file),
  '.ini': (file) => ini.parse(file),
};
export default (type, file) => parsers[type](file);
