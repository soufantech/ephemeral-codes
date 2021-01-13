const IdentitySerializer = require('../identity-serializer');

describe('IdentitySerializer', () => {
  it('serializes a payload by just returning it.', () => {
    const idSerializer = new IdentitySerializer();

    const PAYLOAD = 'someemail@someprovider.com';

    const serialized = idSerializer.serialize(PAYLOAD);

    expect(serialized.data).toBe(PAYLOAD);
    expect(serialized.uid).toBe(PAYLOAD);
  });

  it('deserializes a payload by just returnint it.', () => {
    const idSerializer = new IdentitySerializer();

    const PAYLOAD = 'someemail@someprovider.com';

    const serialized = idSerializer.serialize(PAYLOAD);

    const deserialized = idSerializer.deserialize(serialized.data);

    expect(deserialized.data).toBe(PAYLOAD);
    expect(deserialized.uid).toBe(PAYLOAD);
  });

  it('serializes a payload using a custom uid resolver.', () => {
    const idSerializer = new IdentitySerializer({
      resolveUid: (email) => email.split('@')[0],
    });

    const PAYLOAD = 'someemail@someprovider.com';

    const serialized = idSerializer.serialize(PAYLOAD);

    expect(serialized.data).toBe(PAYLOAD);
    expect(serialized.uid).toBe('someemail');
  });

  it('deserializes a payload using a custom uid resolver.', () => {
    const idSerializer = new IdentitySerializer({
      resolveUid: (email) => email.split('@')[0],
    });

    const PAYLOAD = 'someemail@someprovider.com';

    const serialized = idSerializer.serialize(PAYLOAD);

    const deserialized = idSerializer.deserialize(serialized.data);

    expect(deserialized.data).toBe(PAYLOAD);
    expect(deserialized.uid).toBe('someemail');
  });
});
