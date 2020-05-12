import { ExpirationTime } from '../code-registry';
import { RenewableCodeRegistry } from '../renewable-code-registry';
import { jsonSerializer } from '../serializers';
import getRedis from './get-redis';

beforeEach(() => {
  return getRedis().then(redis => redis.flushdb());
});

describe('RenewableCodeRegistry', () => {
  describe('code registration', () => {
    it('renews code on every registration.', async () => {
      const redis = await getRedis();
      const passwordResetCodes = new RenewableCodeRegistry(
        redis,
        'password-reset'
      );

      const USER_EMAIL = 'jamesmcgill@hhmandassociates.com';

      const { code: earlierCode } = await passwordResetCodes.register(
        USER_EMAIL
      );
      const { code: laterCode } = await passwordResetCodes.register(USER_EMAIL);

      const earlierData = await passwordResetCodes.retrieve(earlierCode);
      const laterData = await passwordResetCodes.retrieve(laterCode);

      expect(earlierData).toBeNull();
      expect(laterData).toBeDefined();
    });

    it('renews code on every registration with a UID resolver.', async () => {
      const redis = await getRedis();
      const passwordResetCodes = new RenewableCodeRegistry(
        redis,
        'password-reset',
        {
          serializer: jsonSerializer,
          resolveUid: ({ email }) => email,
        }
      );

      const USER_INPUT = {
        email: 'jamesmcgill@hhmandassociates.com',
        userAgent: 'Chrome/18.0',
      };

      const { code: earlierCode } = await passwordResetCodes.register(
        USER_INPUT
      );
      const { code: laterCode } = await passwordResetCodes.register(USER_INPUT);

      const earlierData = await passwordResetCodes.retrieve(earlierCode);
      const laterData = await passwordResetCodes.retrieve(laterCode);

      expect(earlierData).toBeNull();
      expect(laterData).toBeDefined();
    });
  });

  describe('code refreshing', () => {
    it('refreshes an existing code.', async () => {
      const redis = await getRedis();
      const passwordResetCodes = new RenewableCodeRegistry(
        redis,
        'password-reset'
      );

      const USER_EMAIL = 'jamesmcgill@hhmandassociates.com';

      const { code } = await passwordResetCodes.register(USER_EMAIL);

      const refreshed = await passwordResetCodes.refresh(
        code,
        ExpirationTime.TwelveHours
      );

      expect(refreshed).toBeGreaterThan(0);
    });

    it('refresh count is 0 when code does not exist.', async () => {
      const redis = await getRedis();
      const passwordResetCodes = new RenewableCodeRegistry(
        redis,
        'password-reset'
      );

      const NONEXISTENT_CODE = 'N08K2B';

      const refreshed = await passwordResetCodes.refresh(
        NONEXISTENT_CODE,
        ExpirationTime.TwelveHours
      );

      expect(refreshed).toBe(0);
    });
  });

  describe('code erasure', () => {
    it('erases an existing code.', async () => {
      const redis = await getRedis();
      const passwordResetCodes = new RenewableCodeRegistry(
        redis,
        'password-reset'
      );

      const USER_EMAIL = 'jamesmcgill@hhmandassociates.com';

      const { code } = await passwordResetCodes.register(USER_EMAIL);

      const eraseCount = await passwordResetCodes.erase(code);

      expect(eraseCount).toBeGreaterThan(0);
    });

    it('erase count is 0 when code does not exist.', async () => {
      const redis = await getRedis();
      const passwordResetCodes = new RenewableCodeRegistry(
        redis,
        'password-reset'
      );

      const NONEXISTENT_CODE = 'N08K2B';

      const refreshed = await passwordResetCodes.erase(NONEXISTENT_CODE);

      expect(refreshed).toBe(0);
    });
  });
});
