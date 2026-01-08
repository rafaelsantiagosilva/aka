import { createLink } from "@/core/links/usecases/create-link";
import { getLinkByOriginalUrl } from "@/core/links/usecases/get-link-by-original-url";
import { getLinkByShortUrl } from "@/core/links/usecases/get-link-by-short-url";
import { updateLink } from "@/core/links/usecases/update-link";
import { nanoid } from "nanoid";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { url: originalUrl } = await request.json();
  const shortCode = nanoid(6);
  const headersList = headers();

  const host = (await headersList).get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  let shortUrl = `${protocol}://${host}/${shortCode}`;

  while (await getLinkByShortUrl(shortUrl))
    shortUrl = nanoid(6);

  const linkAlreadyExists = await getLinkByOriginalUrl(originalUrl);

  if (linkAlreadyExists) {
    const newLink = await updateLink({ ...linkAlreadyExists, shortUrl });
    return NextResponse.json(newLink);
  }

  const newLink = await createLink({ originalUrl, shortUrl });

  return NextResponse.json(newLink);
}