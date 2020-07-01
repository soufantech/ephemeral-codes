class JsonSerializer {
  constructor({ resolveUid }) {
    if (typeof resolveUid !== 'function') {
      throw new TypeError(
        'Argument `resolveUid` must be provided as a function'
      );
    }

    this._resolveUid = resolveUid;
  }

  serialize(data) {
    return {
      data: JSON.stringify(data),
      uid: this._resolveUid(data),
    };
  }

  deserialize(data) {
    const deserializedData = JSON.parse(data);

    return {
      data: deserializedData,
      uid: this._resolveUid(deserializedData),
    };
  }
}

module.exports = JsonSerializer;
