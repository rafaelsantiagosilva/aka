import { getLinkRedis } from "@/redis/get-link-redis";
import { PrismaLinkRepository } from "../repositories/prisma-link-repository";
import { setLinkRedis } from "@/redis/set-link-redis";

export async function getLinkByShortUrl(shortUrl: string) {
  const cacheLink = await getLinkRedis(shortUrl);

  if (cacheLink !== null)
    return cacheLink;

  const linkRepository = new PrismaLinkRepository();
  const result = await linkRepository.searchByParam({
    shortUrl
  });

  if (result)
    await setLinkRedis(shortUrl, result);

  return result;
}