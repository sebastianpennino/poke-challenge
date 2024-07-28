import Redis from "ioredis";

let redisClientInstance: Redis;

export function getRedisClient(): Redis {
  if (!redisClientInstance) {
    redisClientInstance = new Redis(
      process.env.REDIS_URL || "redis://default:admin@127.0.0.1:6379/0",
    );

    redisClientInstance.on("error", (err) => {
      console.error("Redis error:", err);
    });

    redisClientInstance.on("connect", () => {
      console.log(`✅ Connected to redis at ${process.env.REDIS_URL}`); // 127.0.0.1:6379
    });
  }

  return redisClientInstance;
}
