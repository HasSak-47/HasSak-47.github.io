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

interface ProjectProps {
  name: string;
  repo: string;
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
  return (
    <div className='bg-sumiInk1 text-fujiWhite flex min-h-screen w-screen min-w-[200px] flex-col justify-between'>
      <header className='bg-sumiInk3 px-6 py-8 text-3xl font-bold tracking-wider shadow-md'>
        <h1 className='text-crystalBlue'>Portafolio</h1>
      </header>

      <main className='flex flex-col items-center justify-center gap-6 px-4 py-10'>
        <div className='flex w-full flex-col items-center justify-center gap-6 px-4 py-10'>
          <h1 className='text-crystalBlue text-3xl'>Personal Projects</h1>
          <Project name='Luall' repo='HasSak-47/cshell' />
          <Project name='LyTop' repo='HasSak-47/monitor' />
          <Project name='Project Manager' repo='HasSak-47/project_manager' />
        </div>
      </main>

      <footer className='bg-dragonBlack1 text-lotusWhite3 border-sumiInk4 flex justify-center gap-4 border-t py-6'>
        <Link
          icon={FaGithub}
          name='GitHub'
          href='https://github.com/HasSak-47'
        />
        <Link
          icon={FaLinkedin}
          name='LinkedIn'
          href='https://github.com/HasSak-47'
        />
      </footer>
    </div>
  );
}

export default App;
