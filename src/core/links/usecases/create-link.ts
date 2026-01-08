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
    throw new Error("That link already exists");

  const result = await linkRepository.save(link);
  return result;
}