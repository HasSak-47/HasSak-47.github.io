import { HiChevronDown, HiChevronUp } from 'react-icons/hi';

import { useEffect, useRef, useState } from 'react';

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

function generateUrl(page: string | null, text: string) {
  return (
    page && (
      <a
        href={page}
        target='_blank'
        rel='noopener noreferrer'
        className='text-lightBlue hover:text-springBlue inline-block w-full text-sm'
      >
        {text}
      </a>
    )
  );
}

export interface ProjectProps {
  name: string;
  owner: string;
  project: string;
  branch?: string;
  focus?: boolean;
  tools?: string[];
  desc?: string[];
  page?: string;
}

export default function Project({
  name,
  owner,
  project,
  branch,
  focus,
  tools,
  page,
  desc,
}: ProjectProps) {
  const [readme, setReadme] = useState<string | null>(null);
  const [showReadme, setShowReadme] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch README on mount
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
  }, [owner, project, branch]);

  // Focus div when `focus` is true
  useEffect(() => {
    if (focus && containerRef.current) {
      containerRef.current.focus();
    } else if (containerRef.current) {
      containerRef.current.blur();
    }
  }, [focus]);

  const githubUrl = getGithubRepoUrl(owner, project);

  return (
    <div
      ref={containerRef}
      className='border-sumiInk4 bg-sumiInk2 focus:border-sumiInk3 w-full max-w-3xl rounded-xl border p-6 shadow-md'
      tabIndex={-1}
    >
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
      <div className='text-justify'> {desc} </div>
      {showReadme && readme && (
        <div className='markdown prose prose-invert border-dragonBlue2 mt-4 max-w-none rounded-lg border p-6'>
          <ReactMarkdown>{readme}</ReactMarkdown>
        </div>
      )}
      {generateUrl(githubUrl, 'View on Github')}
      {generateUrl(page || null, 'View Page')}
    </div>
  );
}
