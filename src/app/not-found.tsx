import { Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
	return (
		<div className="flex flex-col gap-2 items-center justify-center h-dvh w-dvw bg-linear-to-br from-gray-800 to-gray-950">
			<header className="text-center">
				<h1 className="text-4xl italic text-shadow-2xs text-shadow-slate-600 font-bold">
					404
				</h1>
				<h2 className="text-2xl mt-2">Página não encontrada.</h2>
			</header>

			<Link href={'/'} className="flex gap-1 underline items-center">
				Voltar para Início <Home size={20} />{' '}
			</Link>
		</div>
	);
}
