import { getLinkByOriginalUrl } from "@/core/links/usecases/get-link-by-original-url";
import { getLinkByShortUrl } from "@/core/links/usecases/get-link-by-short-url";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { url: string } }
) {
  try {
    const decodedUrl = decodeURIComponent(params.url);
    const result = await getLinkByOriginalUrl(decodedUrl) || await getLinkByShortUrl(decodedUrl);
    return NextResponse.json(result);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}