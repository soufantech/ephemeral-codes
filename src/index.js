const codeRegistry = require('./code-registry');
const renewableCodeRegistry = require('./renewable-code-registry');
const generateCode = require('./generate-code');
const { JsonSerializer, IdentitySerializer } = require('./serializers');

module.exports = {
  JsonSerializer,
  IdentitySerializer,
  generateCode,
  ...codeRegistry,
  ...renewableCodeRegistry,
};
