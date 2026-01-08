import { redis } from "./client";

export async function getLinkRedis(shortLink: string) {
  const cache = await redis.get(shortLink);
  return cache ? JSON.parse(cache) : null;
}