import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useEffect, useState } from 'react';

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
      className='border-dragonBlack4 text-lightBlue hover:text-crystalBlue hover:border-dragonBlue flex items-center gap-2 px-4 py-2 transition'
      target='_blank'
      rel='noopener noreferrer'
    >
      <Icon className='h-5 w-5' />
      {name}
    </a>
  );
}

export default function App() {
  const [projectList, setProjectList] = useState<
    ProjectProps[]
  >([]);
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      const res = await fetch('./data.json');
      const data = await res.json();
      setProjectList(data['projects']);
    }
    fetchProjects();
  }, []);

  useEffect(() => {
    const handler = (delta: number) => {
      return (prev: number | null) => {
        if (prev === null) return 0;
        let next = prev + delta;
        if (next < 0) next = 0;
        if (next >= projectList.length)
          next = projectList.length - 1;
        return next;
      };
    };
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'j') {
        setIndex(handler(1));
      } else if (e.key === 'k') {
        setIndex(handler(-1));
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () =>
      window.removeEventListener('keydown', handleKeyDown);
  }, [projectList.length]);

  const main = (
    <main className='m-auto flex max-w-3xl flex-1 flex-col items-center justify-center gap-6 py-10'>
      <h1 className='text-crystalBlue flex w-full flex-col items-center justify-center gap-6 px-4 py-10 text-3xl'>
        Personal Projects
      </h1>
      {projectList.map((props, i) => (
        <Project key={i} {...props} focus={i === index} />
      ))}
    </main>
  );

  return (
    <div className='bg-sumiInk1 text-fujiWhite flex min-h-screen w-screen min-w-50 flex-col justify-between'>
      <header className='bg-sumiInk3 px-6 py-8 text-3xl font-bold tracking-wider shadow-md'>
        <h1 className='text-crystalBlue'>Daniel Alanis</h1>
      </header>

      {main}

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
