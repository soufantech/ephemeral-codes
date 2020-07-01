const generateCode = require('./generate-code');
const { IdentitySerializer } = require('./serializers');

const ExpirationTime = {
  FifteenMins: 900,
  ThirtyMins: 1800,
  OneHour: 3600,
  TwoHours: 7200,
  TwelveHours: 43200,
  OneDay: 86400,
  TwoDays: 172800,
};

/**
 * A registry for codes.
 */
class CodeRegistry {
  constructor(redis, baseKey, options = {}) {
    const {
      expiresIn = ExpirationTime.OneHour,
      serializer = new IdentitySerializer(),
      codeGenerator = generateCode,
    } = options;

    this._redis = redis;
    this._baseKey = baseKey;
    this._serializer = serializer;
    this._generateCode = codeGenerator;
    this._expiresIn = expiresIn;
  }

  _assembleCodeKey(code) {
    return `${this._baseKey}:${code}`;
  }

  _serialize(data) {
    return this._serializer.serialize(data);
  }

  _deserialize(data) {
    return this._serializer.deserialize(data);
  }

  async register(data, options = {}) {
    const {
      code = this._generateCode(),
      expiresIn = this._expiresIn,
    } = options;

    const codeKey = this._assembleCodeKey(code);
    const { data: serializedData } = this._serialize(data);

    await this._redis.set(codeKey, serializedData, 'EX', expiresIn);

    return { code, expiresIn };
  }

  async retrieve(code) {
    const codeKey = this._assembleCodeKey(code);
    const data = await this._redis.get(codeKey);

    if (data === null) return null;

    return this._deserialize(data).data;
  }

  refresh(code, expiresIn) {
    const codeKey = this._assembleCodeKey(code);

    return this._redis.expire(codeKey, expiresIn);
  }

  erase(code) {
    const codeKey = this._assembleCodeKey(code);

    return this._redis.del(codeKey);
  }

  timeLeft(code) {
    const codeKey = this._assembleCodeKey(code);

    return this._redis.ttl(codeKey);
  }
}

module.exports = {
  CodeRegistry,
  ExpirationTime,
};
