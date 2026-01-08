import { PrismaLinkRepository } from "../repositories/prisma-link-repository";

export async function getLinkByShortUrl(shortUrl: string) {
  const linkRepository = new PrismaLinkRepository();
  const result = await linkRepository.searchByParam({
    shortUrl
  });

  return result;
}