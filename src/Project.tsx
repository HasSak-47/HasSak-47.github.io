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
        className='text-syn-type hover:text-syn-fun text-sm tracking-[0.2em] uppercase transition'
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

function Project({
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
  const [leaving, setLeaving] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const leavingTimeoutRef = useRef<number | null>(null);

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

  useEffect(() => {
    return () => {
      if (leavingTimeoutRef.current !== null) {
        window.clearTimeout(leavingTimeoutRef.current);
      }
    };
  }, []);

  const githubUrl = getGithubRepoUrl(owner, project);
  const status = opts['status' as keyof typeof opts];
  const canShowReadme = false;

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
      className={`focus:bg-ui-bg-visual relative z-0 flex min-h-80 w-full flex-col px-3 py-5 transition duration-500 backface-hidden focus:z-10 focus:scale-110 focus:outline-none sm:px-5 sm:py-6 ${leaving ? 'z-5' : ''
        }`}
      onFocus={() => {
        setLeaving(false);
        if (leavingTimeoutRef.current !== null) {
          window.clearTimeout(leavingTimeoutRef.current);
        }
      }}
      onBlur={() => {
        setLeaving(true);
        if (leavingTimeoutRef.current !== null) {
          window.clearTimeout(leavingTimeoutRef.current);
        }
        leavingTimeoutRef.current = window.setTimeout(
          () => {
            setLeaving(false);
          },
          1000
        );
      }}
      tabIndex={-1}
    >
      <div className='flex flex-1 flex-col gap-4'>
        <div className='flex flex-1 flex-col gap-4'>
          <div>
            <h2 className='text-syn-fun text-2xl leading-tight font-semibold tracking-[0.04em] uppercase'>
              {name}
            </h2>
            <p className='text-syn-comment mt-2 text-xs tracking-[0.24em] uppercase'>
              {status}
            </p>
          </div>
          <p className='text-ui-fg max-h-42 overflow-hidden text-sm leading-7'>
            {desc}
          </p>
          {opts.tools && opts.tools.length > 0 && (
            <div className='mt-auto flex flex-wrap gap-x-3 gap-y-2'>
              {opts.tools.map((tool) => (
                <span
                  key={tool}
                  className='text-syn-parameter text-xs tracking-[0.18em] uppercase'
                >
                  {tool}
                </span>
              ))}
            </div>
          )}
          <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
            {generateUrl(githubUrl, 'Repository')}
            {generateUrl(page || null, 'Live Page')}
            {canShowReadme && readme && (
              <button
                className='text-syn-type hover:text-syn-fun inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase transition'
                onClick={() => setShowReadme(!showReadme)}
                title={
                  showReadme ? 'Hide README' : 'Show README'
                }
              >
                {showReadme
                  ? 'Hide readme.md'
                  : 'Show readme.md'}
                <span className='text-base'>
                  {showReadme ? (
                    <HiChevronUp />
                  ) : (
                    <HiChevronDown />
                  )}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
      {canShowReadme && showReadme && readme && (
        <div className='markdown prose prose-invert border-ui-float-fg-border mt-6 max-w-none border p-6'>
          <ReactMarkdown>{readme}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const [projectList, setProjectList] = useState<
    ProjectProps[]
  >([]);

  const [index, setIndex] = useState<number | null>(null);
  const [projectGridColumns, setProjectGridColumns] =
    useState(1);

  useEffect(() => {
    const syncGridColumns = () => {
      if (window.matchMedia('(min-width: 80rem)').matches) {
        setProjectGridColumns(3);
      } else if (
        window.matchMedia('(min-width: 48rem)').matches
      ) {
        setProjectGridColumns(2);
      } else {
        setProjectGridColumns(1);
      }
    };

    syncGridColumns();
    window.addEventListener('resize', syncGridColumns);
    return () =>
      window.removeEventListener('resize', syncGridColumns);
  }, []);

  useEffect(() => {
    const syncGridColumns = () => {
      if (window.matchMedia('(min-width: 80rem)').matches) {
        setProjectGridColumns(3);
      } else if (
        window.matchMedia('(min-width: 48rem)').matches
      ) {
        setProjectGridColumns(2);
      } else {
        setProjectGridColumns(1);
      }
    };

    syncGridColumns();
    window.addEventListener('resize', syncGridColumns);
    return () =>
      window.removeEventListener('resize', syncGridColumns);
  }, []);

  useEffect(() => {
    const moveHorizontal = (delta: number) => {
      return (prev: number | null) => {
        if (prev === null) return 0;
        let next = prev + delta;
        if (next < 0) next = 0;
        if (next >= projectList.length)
          next = projectList.length - 1;
        return next;
      };
    };

    const moveVertical = (delta: number) => {
      return (prev: number | null) => {
        if (prev === null) return 0;
        const next = prev + delta * projectGridColumns;
        if (next < 0 || next >= projectList.length) {
          return prev;
        }
        return next;
      };
    };

    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target;
      e.preventDefault();
      if (
        target instanceof HTMLElement &&
        target.closest(
          'a, button, input, textarea, select, [contenteditable="true"]'
        )
      ) {
        return;
      }
      if (e.key == 'Escape') {
        setIndex(null);
      } else if (e.key === 'j' || e.key == 'ArrowDown') {
        setIndex(moveVertical(1));
      } else if (e.key === 'k' || e.key == 'ArrowUp') {
        setIndex(moveVertical(-1));
      } else if (e.key === 'h' || e.key == 'ArrowLeft') {
        setIndex(moveHorizontal(-1));
      } else if (e.key === 'l' || e.key == 'ArrowRight') {
        setIndex(moveHorizontal(1));
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () =>
      window.removeEventListener('keydown', handleKeyDown);
  }, [projectGridColumns, projectList.length]);

  useEffect(() => {
    async function fetchProjects() {
      const res = await fetch('./data.json');
      const data = await res.json();
      setProjectList(data['projects']);
    }
    fetchProjects();
  }, []);
  return (
    <main className='mx-auto flex w-full max-w-6xl flex-1 flex-col px-2 py-4 sm:px-3 lg:px-4'>
      <section className='px-3 py-5 sm:px-5'>
        <h1 className='text-ui-fg mt-4 text-4xl font-semibold tracking-[0.08em] uppercase sm:text-5xl'>
          Personal Projects
        </h1>
        <p className='text-ui-fg mt-5 max-w-5xl text-base leading-8'>
          Some of the personal projects I have worked on,
          mostly *nix utilities, language tooling, and
          interface experiments.{' '}
          <div className='hidden md:inline'>
            {' '}
            Use{' '}
            <div className='text-syn-constant inline font-mono'>
              h
            </div>
            ,{' '}
            <div className='text-syn-constant inline font-mono'>
              j
            </div>
            ,{' '}
            <div className='text-syn-constant inline font-mono'>
              k
            </div>
            ,{' '}
            <div className='text-syn-constant inline font-mono'>
              l
            </div>{' '}
            to move focus across projects. Like in vim :)
            <div className='text-syn-comment text-xs'>
              or just use the arrow keys...
            </div>
          </div>
        </p>
      </section>

      <section className='mt-4 grid gap-px md:grid-cols-2 xl:grid-cols-3'>
        {projectList.map((props, i) => (
          <Project key={i} {...props} focus={i === index} />
        ))}
      </section>
    </main>
  );
}
