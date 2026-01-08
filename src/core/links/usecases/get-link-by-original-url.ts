import { PrismaLinkRepository } from "../repositories/prisma-link-repository";

export async function getLinkByOriginalUrl(originalUrl: string) {
  const urlRepository = new PrismaLinkRepository();
  const result = await urlRepository.searchByParam({
    originalUrl
  });

  return result;
}