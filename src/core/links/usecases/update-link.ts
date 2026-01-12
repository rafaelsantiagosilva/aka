import { getLinkRedis } from "@/redis/get-link-redis";
import { Link } from "../models/link";
import { PrismaLinkRepository } from "../repositories/prisma-link-repository";
import { setLinkRedis } from "@/redis/set-link-redis";
import { ResourceNotFoundError } from "../errors/ResourceNotFoundError";

export async function updateLink(link: Link) {
  const linkRepository = new PrismaLinkRepository();
  const linkAlreadyExists = await linkRepository.searchByParam({
    id: link.id
  });

  if (!linkAlreadyExists)
    throw new ResourceNotFoundError();

  const oneHourFromNow = new Date();
  oneHourFromNow.setHours(oneHourFromNow.getHours() + 1);
  link.expiresAt = oneHourFromNow;

  const result = await linkRepository.save(link);

  if (await getLinkRedis(linkAlreadyExists.shortUrl))
    await setLinkRedis(link.shortUrl, link);

  return result;
}