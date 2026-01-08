import type { Metadata } from 'next';
import { Audiowide, Exo_2 } from 'next/font/google';
import './globals.css';

const audiowide = Audiowide({
	weight: ['400'],
	variable: '--font-audiowide',
});

const exo_2 = Exo_2({
	weight: ['400', '700'],
	variable: '--font-exo-2',
});

export const metadata: Metadata = {
	title: 'AKA | Encurtador de URL',
	description:
		'Caso precise encurtar sua URL, o AKA é a solução perfeita para você! Simples, intuitivo e fácil de se utilizar!',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body
				className={`${exo_2.variable} ${audiowide.variable} font-text antialiased bg-slate-950 text-slate-100 selection:bg-slate-500`}
			>
				{children}
			</body>
		</html>
	);
}
