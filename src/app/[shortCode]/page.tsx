import { getLinkByShortUrl } from '@/core/links/usecases/get-link-by-short-url';
import NotFound from '../not-found';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function RedirectPage({
	params,
}: {
	params: { shortCode: string };
}) {
	const headersList = await headers();
	const host = headersList.get('host') || '';
	const proto = headersList.get('x-forwarded-proto') || 'http';

	const { shortCode } = await params;

	const fullUrl = `${proto}://${host}/${shortCode}`;

	const link = await getLinkByShortUrl(fullUrl);

	console.table(link);

	if (!link) return <NotFound />;

	redirect(link.originalUrl);
}
