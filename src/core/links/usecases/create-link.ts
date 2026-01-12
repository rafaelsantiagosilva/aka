import { LinkAlreadyExistsError } from "../errors/LinkAlreadyExistsError";
import { Link } from "../models/link";
import { PrismaLinkRepository } from "../repositories/prisma-link-repository";

export async function createLink(link: Link) {
  const linkRepository = new PrismaLinkRepository();
  const linkAlreadyExists = await linkRepository.searchByParam({
    originalUrl: link.originalUrl
  }) || await linkRepository.searchByParam({
    shortUrl: link.shortUrl
  });

  if (linkAlreadyExists)
    throw new LinkAlreadyExistsError();

  const oneHourFromNow = new Date();
  oneHourFromNow.setHours(oneHourFromNow.getHours() + 1);
  link.expiresAt = oneHourFromNow;

  const result = await linkRepository.save(link);
  return result;
}