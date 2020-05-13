const identitySerializer = {
  serialize(data) {
    return data;
  },

  deserialize(data) {
    return data;
  },
};

const jsonSerializer = {
  serialize(data) {
    return JSON.stringify(data);
  },

  deserialize(data) {
    return JSON.parse(data);
  },
};

module.exports = {
  jsonSerializer,
  identitySerializer,
};
