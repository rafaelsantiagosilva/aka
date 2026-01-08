import { Link } from "../models/link";
import { PrismaLinkRepository } from "../repositories/prisma-link-repository";

export async function updateLink(link: Link) {
  const linkRepository = new PrismaLinkRepository();
  const linkAlreadyExists = await linkRepository.searchByParam({
    id: link.id
  });

  if (!linkAlreadyExists)
    throw new Error("That URL doesn't exist");

  const result = await linkRepository.save(link);
  return result;
}