import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT, 10),
  db: parseInt(process.env.REDIS_DATABASE, 10),
  password: process.env.REDISCLI_AUTH || '',
});

const redisPromise = new Promise((resolve, reject) => {
  redis.on('connect', resolve(redis));
  redis.on('error', reject);
});

export default () => {
  return redisPromise;
};
