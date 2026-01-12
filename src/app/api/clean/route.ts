import { NextResponse } from "next/server";
import { PrismaLinkRepository } from "@/core/links/repositories/prisma-link-repository";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`)
    return new Response("Not authorized", { status: 401 });

  const linkRepository = new PrismaLinkRepository();
  const cleaned = await linkRepository.deleteExpired();

  return NextResponse.json({
    cleaned
  });
}