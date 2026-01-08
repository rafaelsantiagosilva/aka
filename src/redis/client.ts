import { createClient } from "redis";
import "dotenv/config";

const redis = createClient({
  url: process.env.REDIS_URL
});

redis.on('error', (err) => console.error('> Redis Client error: ', err));

await redis.connect();

export { redis };