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
      className='text-lightBlue hover:text-crystalBlue hover:border-dragonBlue inline-flex items-center gap-2 px-3 py-2 text-xs tracking-[0.22em] uppercase transition'
      target='_blank'
      rel='noopener noreferrer'
    >
      <Icon className='h-5 w-5' />
      {name}
    </a>
  );
}

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <a
      href={href}
      className={`border-b px-1 py-2 text-xs tracking-[0.25em] uppercase transition sm:text-sm ${active
          ? 'text-crystalBlue border-crystalBlue'
          : 'text-lotusWhite3/70 hover:text-lightBlue border-transparent'
        }`}
    >
      {label}
    </a>
  );
}

function getRoute() {
  const hash = window.location.hash.replace(/^#/, '');
  return hash === '/projects' ? '/projects' : '/';
}

function getProjectDescription(
  project?: ProjectProps & {
    shotest_desc?: string;
  }
) {
  if (!project) return '';
  return (
    project.desc ??
    project.short_desc ??
    project.shortest_desc ??
    project.shotest_desc ??
    ''
  );
}

export default function App() {
  const [projectList, setProjectList] = useState<
    ProjectProps[]
  >([]);
  const [route, setRoute] = useState('/');
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
    const syncRoute = () => setRoute(getRoute());
    syncRoute();
    window.addEventListener('hashchange', syncRoute);
    return () =>
      window.removeEventListener('hashchange', syncRoute);
  }, []);

  useEffect(() => {
    if (route !== '/projects') return;

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
  }, [projectList.length, route]);

  const runnableProjects = projectList.filter(
    (p) => p.status != 'wip'
  );
  const featuredProject = runnableProjects[0];
  const topProjects = runnableProjects.slice(1, 4);
  const home = (
    <main className='mx-auto flex w-full max-w-6xl flex-1 flex-col px-2 py-4 sm:px-3 lg:px-4'>
      <section className='relative overflow-hidden px-3 py-6 sm:px-5 sm:py-8'>
        <div className=''>
          <h1 className='text-lotusWhite3 text-4xl leading-tight font-semibold tracking-[0.08em] uppercase sm:text-5xl'>
            Daniel Alanis
          </h1>
        </div>
        <p className='text-dragonBlue2 text-base leading-8 sm:text-lg'>
          I am a systems-oriented software engineer focused
          on low-level programming, developer tooling, and
          extensible software design. I value simple,
          composable technologies and emphasize performance,
          maintainability, and clear architecture in my
          work.
        </p>
        <div className='mt-5 flex flex-wrap gap-3'>
          <a
            href='#/projects'
            className='bg-crystalBlue text-sumiInk0 hover:bg-lightBlue inline-flex border border-transparent px-4 py-3 text-xs tracking-[0.24em] uppercase transition'
          >
            Open Projects
          </a>
          <a
            href='https://github.com/HasSak-47'
            target='_blank'
            rel='noopener noreferrer'
            className='border-sumiInk4 text-lotusWhite3 hover:border-dragonBlue hover:text-lightBlue inline-flex border px-4 py-3 text-xs tracking-[0.24em] uppercase transition'
          >
            Source Archive
          </a>
        </div>
      </section>

      <section className='mt-4 grid lg:grid-cols-[0.9fr_1.1fr]'>
        <div className='p-3 sm:p-4'>
          <p className='text-fujiGray mb-4 text-xs tracking-[0.3em] uppercase'>
            Selected Work
          </p>
          <h2 className='text-lotusWhite3 text-3xl leading-tight font-semibold uppercase'>
            {featuredProject?.name ?? 'Project Archive'}
          </h2>
          <p className='text-dragonBlue2 mt-5 text-base leading-7'>
            {getProjectDescription(featuredProject) ||
              'A growing archive of system software and interface experiments.'}
          </p>
          {(featuredProject?.tools?.length ?? 0) > 0 && (
            <div className='border-sumiInk4 mt-6 border-t pt-4'>
              <p className='text-fujiGray text-xs tracking-[0.24em] uppercase'>
                Stack
              </p>
              <p className='text-lightBlue mt-2 text-sm leading-7 uppercase'>
                {featuredProject?.tools?.join(' / ')}
              </p>
            </div>
          )}
          <div className='mt-4 flex flex-wrap gap-3'>
            <a
              href='#/projects'
              className='text-lightBlue hover:text-crystalBlue text-sm tracking-[0.2em] uppercase'
            >
              View full project index
            </a>
            {featuredProject && (
              <a
                href={`https://github.com/${featuredProject.owner}/${featuredProject.project}`}
                target='_blank'
                rel='noopener noreferrer'
                className='text-dragonBlue2 hover:text-lightBlue text-sm tracking-[0.2em] uppercase'
              >
                Open repository
              </a>
            )}
          </div>
        </div>

        <div className='bg-waveBlue1/20 grid gap-px'>
          {topProjects.map((project, i) => (
            <div
              key={project.name}
              className='border-sumiInk4 bg-sumiInk1 p-3 sm:p-4'
            >
              <p className='text-crystalBlue text-ls tracking-[0.28em] uppercase'>
                {`0${i + 1} / ${project.name}`}
              </p>
              <p className='text-dragonBlue2 text-s mt-3 leading-8'>
                {getProjectDescription(project) ||
                  'No project description available yet.'}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );

  const projects = (
    <main className='mx-auto flex w-full max-w-6xl flex-1 flex-col px-2 py-4 sm:px-3 lg:px-4'>
      <section className='px-3 py-5 sm:px-5'>
        <h1 className='text-lotusWhite3 mt-4 text-4xl font-semibold tracking-[0.08em] uppercase sm:text-5xl'>
          Personal Projects
        </h1>
        <p className='text-dragonBlue2 mt-5 text-base leading-8'>
          Some of the personal projects I have worked on,
          mostly *nix utilities, language tooling, and
          interface experiments. Use `j` and `k` to move
          focus across cards. Like in vim :)
        </p>
      </section>

      <section className='mt-4 grid gap-4'>
        {projectList.map((props, i) => (
          <Project key={i} {...props} focus={i === index} />
        ))}
      </section>
    </main>
  );

  return (
    <div className='bg-sumiInk1 text-fujiWhite flex min-h-screen w-screen min-w-50 flex-col'>
      <header className='bg-sumiInk3/95 border-sumiInk4 sticky top-0 z-20 border-b px-4 py-5 shadow-md backdrop-blur sm:px-6 lg:px-8'>
        <div className='mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h1 className='text-crystalBlue text-2xl font-bold tracking-[0.18em] uppercase'>
              Daniel Alanis
            </h1>
            <p className='text-fujiGray mt-1 text-xs tracking-[0.25em] uppercase'>
              dev_portfolio_v2
            </p>
          </div>

          <nav className='flex flex-wrap items-center gap-4'>
            <NavLink
              href='#/'
              label='Home'
              active={route === '/'}
            />
            <NavLink
              href='#/projects'
              label='Projects'
              active={route === '/projects'}
            />
          </nav>
        </div>
      </header>

      {route === '/projects' ? projects : home}

      <footer className='bg-dragonBlack1 text-lotusWhite3 border-sumiInk4 border-t px-4 py-6'>
        <div className='mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row'>
          <div className='text-fujiGray text-xs tracking-[0.24em] uppercase'></div>
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
