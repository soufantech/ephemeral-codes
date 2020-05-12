import { CodeRegistry, ExpirationTime } from '../code-registry';
import { jsonSerializer } from '../serializers';
import generateCode from '../generate-code';
import getRedis from './get-redis';

beforeEach(() => {
  return getRedis().then(redis => redis.flushdb());
});

describe('CodeRegistry', () => {
  describe('code registration', () => {
    it('registers a code.', async () => {
      const redis = await getRedis();
      const voucherCodes = new CodeRegistry(redis, 'voucher');

      const DISCOUNT = '1630';
      const { code, expiresIn } = await voucherCodes.register(DISCOUNT);

      expect(code).toEqual(expect.any(String));
      expect(expiresIn).toEqual(expect.any(Number));

      const discount = await voucherCodes.retrieve(code);

      expect(discount).toBe(DISCOUNT);
    });

    it('registers a code with a custom code generator algorithm.', async () => {
      const redis = await getRedis();
      const voucherCodes = new CodeRegistry(redis, 'voucher', {
        codeGenerator: () => `BGR-${generateCode(4)}`,
      });

      const DISCOUNT = '1630';
      const { code } = await voucherCodes.register(DISCOUNT);

      expect(code).toMatch(/BGR-[A-Z0-9]{4}/);
    });

    it('registers a code with an expiration time.', async () => {
      const redis = await getRedis();
      const voucherCodes = new CodeRegistry(redis, 'voucher', {
        expiresIn: ExpirationTime.ThirtyMins,
      });

      const DISCOUNT = '1630';
      const { expiresIn } = await voucherCodes.register(DISCOUNT);

      expect(expiresIn).toBe(ExpirationTime.ThirtyMins);
    });

    it('registers a code with a data serializer.', async () => {
      const redis = await getRedis();
      const voucherCode = new CodeRegistry(redis, 'voucher', {
        serializer: jsonSerializer,
      });

      const VOUCHER_DATA = {
        discount: '1630',
        establishment: 'Special Burguer',
      };

      const { code, expiresIn } = await voucherCode.register(VOUCHER_DATA);

      expect(code).toEqual(expect.any(String));
      expect(expiresIn).toEqual(expect.any(Number));

      const voucherData = await voucherCode.retrieve(code);

      expect(voucherData).toEqual(VOUCHER_DATA);
    });

    it('allows expiration time configuration on code registration.', async () => {
      const redis = await getRedis();
      const voucherCodes = new CodeRegistry(redis, 'voucher', {
        expiresIn: ExpirationTime.ThirtyMins,
      });

      const DISCOUNT = '1630';

      const { expiresIn } = await voucherCodes.register(DISCOUNT, {
        expiresIn: ExpirationTime.TwoDays,
      });

      expect(expiresIn).toBe(ExpirationTime.TwoDays);
    });
  });

  describe('code refreshing', () => {
    it('refreshes an existing code.', async () => {
      const redis = await getRedis();
      const voucherCodes = new CodeRegistry(redis, 'voucher', {
        expiresIn: ExpirationTime.OneDay,
      });

      const DISCOUNT = '1630';

      const { code, expiresIn } = await voucherCodes.register(DISCOUNT);

      // Sanity check
      expect(expiresIn).toBe(ExpirationTime.OneDay);

      const refreshCount = await voucherCodes.refresh(
        code,
        ExpirationTime.TwoDays
      );

      const timeLeft = await voucherCodes.timeLeft(code);

      expect(refreshCount).toBeGreaterThan(0);
      expect(timeLeft).toBeGreaterThan(ExpirationTime.OneDay);
    });

    it('refresh count is 0 when code does not exist.', async () => {
      const redis = await getRedis();
      const voucherCodes = new CodeRegistry(redis, 'voucher');

      const NONEXISTENT_CODE = 'AX9TY8';

      const refreshCount = await voucherCodes.refresh(
        NONEXISTENT_CODE,
        ExpirationTime.TwoDays
      );

      expect(refreshCount).toBe(0);
    });
  });

  describe('code erasure', () => {
    it('erases an existing code.', async () => {
      const redis = await getRedis();
      const voucherCodes = new CodeRegistry(redis, 'voucher');

      const DISCOUNT = '1630';

      const { code } = await voucherCodes.register(DISCOUNT);

      const eraseCount = await voucherCodes.erase(code);

      const data = await voucherCodes.retrieve(code);

      expect(eraseCount).toBeGreaterThan(0);
      expect(data).toBeNull();
    });

    it('erase count is 0 when code does not exist.', async () => {
      const redis = await getRedis();
      const voucherCodes = new CodeRegistry(redis, 'voucher');

      const NONEXISTENT_CODE = 'AX9TY8';

      const eraseCount = await voucherCodes.erase(NONEXISTENT_CODE);

      expect(eraseCount).toBe(0);
    });
  });
});
