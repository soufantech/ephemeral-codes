const { CodeRegistry } = require('./code-registry');

const sumAffectedRecords = results => {
  return results.reduce((affected, [, result]) => {
    return affected + parseInt(result, 10);
  }, 0);
};

/**
 * A registry for renewable codes.
 *
 * A code is associated with a unique id (UID) that is stored
 * under the key `meta:*`. Everytime a new code is generated,
 * the former code associated with the UID is replaced by it.
 */
class RenewableCodeRegistry extends CodeRegistry {
  _assembleMetaKey(uid) {
    return `meta:${this._assembleCodeKey(uid)}`;
  }

  async register(data, options = {}) {
    const {
      code = this._generateCode(),
      expiresIn = this._expiresIn,
    } = options;

    const { data: serializedData, uid } = this._serialize(data);
    const codeKey = this._assembleCodeKey(code);
    const metaKey = this._assembleMetaKey(uid);

    const transaction = this._redis.multi();

    const formerCode = await this._redis.get(metaKey);
    if (formerCode) transaction.del(this._assembleCodeKey(formerCode));

    await transaction
      .set(codeKey, serializedData, 'EX', expiresIn)
      .set(metaKey, code, 'EX', expiresIn)
      .exec();

    return { code, expiresIn };
  }

  async refresh(code, expiresIn) {
    const codeKey = this._assembleCodeKey(code);
    const serializedData = await this._redis.get(codeKey);

    if (serializedData === null) return 0;

    const { uid } = this._deserialize(serializedData);
    const metaKey = this._assembleMetaKey(uid);

    return this._redis
      .multi()
      .expire(codeKey, expiresIn)
      .expire(metaKey, expiresIn)
      .exec()
      .then(sumAffectedRecords);
  }

  async erase(code) {
    const codeKey = this._assembleCodeKey(code);
    const serializedData = await this._redis.get(codeKey);

    if (serializedData === null) return 0;

    const { uid } = this._deserialize(serializedData);
    const metaKey = this._assembleMetaKey(uid);

    return this._redis
      .multi()
      .del(codeKey)
      .del(metaKey)
      .exec()
      .then(sumAffectedRecords);
  }
}

module.exports = {
  RenewableCodeRegistry,
};
