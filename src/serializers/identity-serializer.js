class IdentitySerializer {
  constructor({ resolveUid } = {}) {
    if (typeof resolveUid === 'function') {
      this._resolveUid = resolveUid;
    }
  }

  _resolveUid(data) {
    return data;
  }

  serialize(data) {
    return {
      data,
      uid: this._resolveUid(data),
    };
  }

  deserialize(data) {
    return {
      data,
      uid: this._resolveUid(data),
    };
  }
}

module.exports = IdentitySerializer;
