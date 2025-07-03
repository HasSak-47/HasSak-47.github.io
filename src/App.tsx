import { FaGithub, FaLinkedin } from 'react-icons/fa';
// import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
// import ReactMarkdown from 'react-markdown';

import { JSX, useEffect, useState } from 'react';

import Project, { ProjectProps } from './Project';

interface LinkProps {
	icon: React.ElementType;
	name: string;
	href: string;
}

function Link({ icon: Icon, name, href }: LinkProps) {
	return (
		<a
			href={href}
			className='border-dragonBlack4 text-lightBlue hover:text-crystalBlue hover:border-dragonBlue flex items-center gap-2 rounded-lg border px-4 py-2 transition'
			target='_blank'
			rel='noopener noreferrer'
		>
			<Icon className='h-5 w-5' />
			{name}
		</a>
	);
}

function App() {
	const [projects, setProjects] = useState<JSX.Element[]>(
		[]
	);
	useEffect(() => {
		async function fetchProjects() {
			const res = await fetch('./static/data.json');
			const data = await res.json();
			let elements = (
				data['projects'] as ProjectProps[]
			).flatMap((e) => <Project {...e} />);
			setProjects(elements);
		}
		fetchProjects();
	}, [projects]);

	const [index, setIndex] = useState<number | null>(null);
	useEffect(() => {
		const handler = (delta: number) => {
			return (prev: number | null) => {
				if (prev === null) return 0;
				let next = prev + delta;
				if (next < 0) next = 0;
				if (next >= projects.length)
					next = projects.length - 1;

				return next;
			};
		};
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === 'j') {
				setIndex(handler(1));
			} else if (e.key === 'k') {
				setIndex(handler(-1));
			} else if (e.key === 'j') {
				setIndex(null);
			}
		}

		window.addEventListener('keydown', handleKeyDown);
		return () =>
			window.removeEventListener('keydown', handleKeyDown);
	}, [index]);

	return (
		<div className='bg-sumiInk1 text-fujiWhite flex min-h-screen w-screen min-w-[200px] flex-col justify-between'>
			<header className='bg-sumiInk3 px-6 py-8 text-3xl font-bold tracking-wider shadow-md'>
				<h1 className='text-crystalBlue'>Portafolio</h1>
			</header>

			<main className='flex flex-1 flex-col items-center justify-center gap-6 px-4 py-10'>
				<div className='flex w-full flex-col items-center justify-center gap-6 px-4 py-10'>
					<h1 className='text-crystalBlue text-3xl'>
						Personal Projects
					</h1>
				</div>
				{projects}
			</main>

			<footer className='bg-dragonBlack1 text-lotusWhite3 border-sumiInk4 border-t px-4 py-6'>
				<div className='mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row'>
					<div className='flex gap-4'>
						<Link
							icon={FaGithub}
							name='GitHub'
							href='https://github.com/HasSak-47'
						/>
						<Link
							icon={FaLinkedin}
							name='LinkedIn'
							href='https://www.linkedin.com/in/ulises-alanis-255bytes/'
						/>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default App;
