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
  status?: string;
  owner: string;
  project: string;
  branch?: string;
  focus?: boolean;
  tools?: string[];
  desc?: string[];
  short_desc?: string;
  shortest_desc?: string;
  page?: string;
  mode: 'shortest_desc' | 'short_desc' | 'desc';
}

export default function Project({
  name,
  owner,
  project,
  branch,
  focus,
  page,
  mode = 'short_desc',
  ...opts
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
  const status = opts['status' as keyof typeof opts];

  let desc =
    opts[mode] !== undefined
      ? opts[mode]
      : opts['shortest_desc'] !== undefined
        ? opts['shortest_desc']
        : opts['short_desc'] !== undefined
          ? opts['short_desc']
          : opts['short_desc'];

  return (
    <div
      ref={containerRef}
      className='focus:border-crystalBlue w-full p-6 transition'
      tabIndex={-1}
    >
      <div className='mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
        <div>
          <div className='flex flex-wrap items-center gap-3'>
            <div className='text-crystalBlue text-2xl font-semibold uppercase'>
              {name}
            </div>
            {typeof status === 'string' && (
              <span className='border-waveBlue2 text-lightBlue border px-2 py-1 text-xs uppercase'>
                {status}
              </span>
            )}
          </div>
          <div className='text-fujiGray mt-2 text-xs tracking-[0.24em] uppercase'>
            {owner}/{project}
          </div>
          {opts.tools && opts.tools.length > 0 && (
            <div className='mt-4 flex flex-wrap gap-2'>
              {opts.tools.map((tool) => (
                <span
                  key={tool}
                  className='border-sumiInk4 text-dragonBlue2 border px-2 py-1 text-xs uppercase'
                >
                  {tool}
                </span>
              ))}
            </div>
          )}
        </div>
        {readme && (
          <button
            className='text-springViolet1 hover:text-dragonBlue2 flex rounded-lg px-2 py-1 transition'
            onClick={() => setShowReadme(!showReadme)}
            title={
              showReadme ? 'Hide README' : 'Show README'
            }
          >
            {showReadme ? (
              <>
                <div>Hide readme.md</div>
                <div className='mt-auto mb-auto'>
                  <HiChevronUp />
                </div>
              </>
            ) : (
              <>
                <div>Show readme.md</div>
                <div className='mt-auto mb-auto'>
                  <HiChevronDown />
                </div>
              </>
            )}
          </button>
        )}
      </div>
      <div className='text-lotusWhite3/90 text-justify leading-7'>
        {desc}
      </div>
      {showReadme && readme && (
        <div className='markdown prose prose-invert border-dragonBlue2 mt-4 max-w-none rounded-lg border p-6'>
          <ReactMarkdown>{readme}</ReactMarkdown>
        </div>
      )}
      <div className='mt-5 flex flex-col gap-1'>
        {generateUrl(githubUrl, 'View on Github')}
        {generateUrl(page || null, 'View Page')}
      </div>
    </div>
  );
}
