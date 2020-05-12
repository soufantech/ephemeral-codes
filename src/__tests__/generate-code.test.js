import generateCode from '../generate-code';

describe('generateCode', () => {
  it('generates aphanumeric 6 digit uppercase codes.', () => {
    const code = generateCode();

    expect(code).toMatch(/[A-Z0-9]{6}/);
  });

  it('generates codes of custom sizes.', () => {
    const codeWith32Digits = generateCode(32);
    const codeWith2Digits = generateCode(2);

    expect(codeWith32Digits).toMatch(/[A-Z0-9]{32}/);
    expect(codeWith2Digits).toMatch(/[A-Z0-9]{2}/);
  });
});
