import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';

import { useEffect, useState } from 'react';

import ReactMarkdown from 'react-markdown';

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

function getRawReadmeUrl(repo: string, branch = 'main'): string | null {
  const [user, project] = repo.split('/');

  if (!user || !project) return null;

  return `https://raw.githubusercontent.com/${user}/${project}/${branch}/README.md`;
}

function getGithubRepoUrl(repo: string): string | null {
  const [user, project] = repo.split('/');
  if (!user || !project) return null;
  return `https://github.com/${user}/${project}`;
}

interface ProjectProps {
  name: string;
  repo: string;
}

function Project({ name, repo }: ProjectProps) {
  const [readme, setReadme] = useState<string | null>(null);
  const [showReadme, setShowReadme] = useState(false);

  useEffect(() => {
    async function fetchReadme() {
      const rawUrl = getRawReadmeUrl(repo);
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
  }, [repo]);

  const githubUrl = getGithubRepoUrl(repo);

  return (
    <div className='border-sumiInk4 bg-sumiInk2 w-full max-w-3xl rounded-xl border p-6 shadow-md'>
      <div className='mb-3 flex items-center justify-between'>
        <div className='text-crystalBlue text-2xl font-semibold'>{name}</div>
        {readme && (
          <button
            onClick={() => setShowReadme(!showReadme)}
            className='bg-sumiInk4 text-springViolet1 hover:bg-sumiInk5 rounded-lg px-2 py-1 transition'
            title={showReadme ? 'Hide README' : 'Show README'}
          >
            {showReadme ? <HiChevronUp /> : <HiChevronDown />}
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

function App() {
  let projects = [
    { name: 'Luall', repo: 'HasSak-47/cshell' },
    { name: 'LyTop', repo: 'HasSak-47/monitor' },
    { name: 'One offs', repo: 'HasSak-47/oneoffs' },
    { name: 'Project Manager', repo: 'HasSak-47/project_manager' },
  ];

  const [index, setIndex] = useState<number | null>(null);
  useEffect(() => {
    const handler = (delta: number) => {
      return (prev: number | null) => {
        if (prev === null) return 0;
        let next = prev + delta;
        if (next < 0) next = 0;
        if (next >= projects.length) next = projects.length - 1;

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
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [index]);

  return (
    <div className='bg-sumiInk1 text-fujiWhite flex w-screen min-w-[200px] flex-col justify-between'>
      <header className='bg-sumiInk3 px-6 py-8 text-3xl font-bold tracking-wider shadow-md'>
        <h1 className='text-crystalBlue'>Portafolio</h1>
      </header>

      <main className='flex flex-col items-center justify-center gap-6 px-4 py-10'>
        <div className='flex w-full flex-col items-center justify-center gap-6 px-4 py-10'>
          <h1 className='text-crystalBlue text-3xl'>Personal Projects</h1>
        </div>
        {projects.flatMap((p) => (
          <Project name={p.name} repo={p.repo} />
        ))}
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
