import { prisma } from "@/lib/prisma";
import { Link } from "../models/link";
import { ILinkRepository, SearchByParamRequest } from "./ILinkRepository";

export class PrismaLinkRepository implements ILinkRepository {
  async save(link: Link): Promise<Link> {
    if (link.id)
      return await prisma.link.update({
        where: {
          id: link.id
        },
        data: {
          ...link
        }
      });

    return await prisma.link.create({
      data: {
        ...link
      }
    });
  }

  async searchByParam({ id, originalUrl, shortUrl }: SearchByParamRequest): Promise<Link | null> {
    const params = [id, originalUrl, shortUrl];
    let paramsSize = 0;

    params.forEach(p => {
      if (p)
        paramsSize++;
    });

    if (paramsSize != 1)
      throw new Error("Invalid search: needs ONE param (id, originalUrl or shortUrl)");

    const result = await prisma.link.findFirst({
      where: {
        OR: [
          { id },
          { originalUrl },
          { shortUrl }
        ]
      }
    });

    return result;
  }
}