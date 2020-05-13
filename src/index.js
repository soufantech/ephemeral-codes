const codeRegistry = require('./code-registry');
const renewableCodeRegistry = require('./renewable-code-registry');
const generateCode = require('./generate-code');
const { jsonSerializer } = require('./serializers');

module.exports = {
  jsonSerializer,
  generateCode,
  ...codeRegistry,
  ...renewableCodeRegistry,
};
