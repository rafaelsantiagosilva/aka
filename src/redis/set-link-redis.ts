import { Link } from "@/core/links/models/link";
import { redis } from "./client";

export async function setLinkRedis(shortUrl: string, link: Link) {
  await redis.set(shortUrl, JSON.stringify(link));
}