'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Link as LinkType } from '@/core/links/models/link';
import { CheckCheck, Copy, Play } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
	const [url, setUrl] = useState('');
	const [shortedUrl, setShortedUrl] = useState<string | undefined>();
	const [isLoading, setIsLoading] = useState(false);
	const [isCopied, setIsCopied] = useState(false);

	const handleShorten = async () => {
		setIsLoading(true);

		const res = await fetch('/api/shorten', {
			method: 'POST',
			body: JSON.stringify({ url }),
		});

		console.table(res);

		const data: LinkType = await res.json();
		setShortedUrl(data.shortUrl);
		setIsLoading(false);
	};

	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setIsCopied(true);
		} catch (err) {
			console.error('Erro ao copiar: ', err);
		}
	};

	return (
		<div className="flex flex-col gap-2 items-center justify-center h-dvh w-dvw bg-linear-to-br from-gray-800 to-gray-950">
			<header className="text-center">
				<h1 className="text-4xl italic text-shadow-2xs text-shadow-slate-600 font-bold">
					AKA
				</h1>
				<h2 className="text-2xl mt-2">Seu encurtador de URLs!</h2>
			</header>

			<main className="w-2/3 md:w-2/5">
				<Input
					placeholder="Digite sua URL"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
				/>
				{shortedUrl && (
					<>
						<Button
							onClick={() => {
								copyToClipboard(shortedUrl!);
							}}
							className="hover:bg-slate-800 mt-2 w-full border border-slate-700 text-left text-slate-400 font-medium"
						>
							<span className="truncate w-full">{shortedUrl}</span>
							{isCopied ? <CheckCheck /> : <Copy />}
						</Button>
						<Link href={shortedUrl} target="_blank">
							<Button className="hover:bg-slate-800 mt-2 w-full border border-slate-700 text-left text-slate-400 font-medium">
								<span className="w-full">Testar</span>
								<Play />
							</Button>
						</Link>
					</>
				)}
				<Button
					onClick={handleShorten}
					className="hover:bg-slate-800 mt-2 w-full border border-slate-700"
					disabled={isLoading}
				>
					Encurtar
					{isLoading && <Spinner />}
				</Button>
			</main>
		</div>
	);
}
