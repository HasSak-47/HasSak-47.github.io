import { HiChevronDown, HiChevronUp } from 'react-icons/hi';

import { useEffect, useState } from 'react';

import ReactMarkdown from 'react-markdown';

function getGithubRepoUrl(
	owner: string,
	project: string
): string | null {
	return `https://github.com/${owner}/${project}`;
}

function getRawReadmeUrl(
	owner: string,
	project: string,
	branch = 'main'
): string | null {
	return `https://raw.githubusercontent.com/${owner}/${project}/${branch}/README.md`;
}

export interface ProjectProps {
	name: string;
	owner: string;
	project: string;
	branch?: string;
}

export default function Project({
	name,
	owner,
	project,
	branch,
}: ProjectProps) {
	const [readme, setReadme] = useState<string | null>(null);
	const [showReadme, setShowReadme] = useState(false);

	useEffect(() => {
		async function fetchReadme() {
			const rawUrl = getRawReadmeUrl(
				owner,
				project,
				branch
			);
			if (!rawUrl) return;

			try {
				const res = await fetch(rawUrl);
				if (!res.ok) throw new Error('README not found');
				const text = await res.text();
				setReadme(text);
			} catch {
				setReadme(null);
			}
		}

		fetchReadme();
	}, []);

	const githubUrl = getGithubRepoUrl(owner, project);

	return (
		<div className='border-sumiInk4 bg-sumiInk2 w-full max-w-3xl rounded-xl border p-6 shadow-md'>
			<div className='mb-3 flex items-center justify-between'>
				<div className='text-crystalBlue text-2xl font-semibold'>
					{name}
				</div>
				{readme && (
					<button
						onClick={() => setShowReadme(!showReadme)}
						className='bg-sumiInk4 text-springViolet1 hover:bg-sumiInk5 rounded-lg px-2 py-1 transition'
						title={
							showReadme ? 'Hide README' : 'Show README'
						}
					>
						{showReadme ? (
							<HiChevronUp />
						) : (
							<HiChevronDown />
						)}
					</button>
				)}
			</div>

			{githubUrl && (
				<a
					href={githubUrl}
					target='_blank'
					rel='noopener noreferrer'
					className='text-lightBlue hover:text-springBlue mb-4 inline-block text-sm underline'
				>
					View on GitHub
				</a>
			)}

			{/* markdown class makes the custom style in ./markdown apply to childs */}
			{showReadme && readme && (
				<div className='markdown prose prose-invert border-dragonBlue2 mt-4 max-w-none rounded-lg border p-6'>
					<ReactMarkdown>{readme}</ReactMarkdown>
				</div>
			)}
		</div>
	);
}
