const JsonSerializer = require('../json-serializer');

describe('JsonSerializer', () => {
  it('needs a resolveUid function to be given as argument.', () => {
    expect.assertions(2);

    try {
      // eslint-disable-next-line no-unused-vars
      const never = new JsonSerializer({});
    } catch (err) {
      expect(err).toBeInstanceOf(TypeError);
      expect(err.message).toContain('resolveUid');
    }
  });

  it('serializes an object as json.', () => {
    const jsonSerializer = new JsonSerializer({
      resolveUid: data => data.id,
    });

    const PAYLOAD = {
      id: '2523',
      name: 'João',
      age: 25,
    };

    const serialized = jsonSerializer.serialize(PAYLOAD);

    expect(typeof serialized.data).toBe('string');
    expect(serialized.uid).toBe(PAYLOAD.id);
  });

  it('deserializes an object from a json string.', () => {
    const jsonSerializer = new JsonSerializer({
      resolveUid: data => data.id,
    });

    const PAYLOAD = {
      id: '2523',
      name: 'João',
      age: 25,
    };

    const serialized = jsonSerializer.serialize(PAYLOAD);

    const deserialized = jsonSerializer.deserialize(serialized.data);

    expect(deserialized.data).toEqual(PAYLOAD);
    expect(deserialized.uid).toBe(PAYLOAD.id);
  });
});
