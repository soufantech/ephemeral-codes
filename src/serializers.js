export const identitySerializer = {
  serialize(data) {
    return data;
  },

  deserialize(data) {
    return data;
  },
};

export const jsonSerializer = {
  serialize(data) {
    return JSON.stringify(data);
  },

  deserialize(data) {
    return JSON.parse(data);
  },
};
