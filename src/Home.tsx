import { useEffect, useState } from 'react';

import { ProjectProps } from './Project';

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

export default function Home() {
  const [projectList, setProjectList] = useState<
    ProjectProps[]
  >([]);
  useEffect(() => {
    async function fetchProjects() {
      const res = await fetch('./data.json');
      const data = await res.json();
      setProjectList(data['projects']);
    }
    fetchProjects();
  }, []);

  const runnableProjects = projectList.filter(
    (p) => p.status != 'wip'
  );
  const featuredProject = runnableProjects[0];
  const topProjects = runnableProjects.slice(1, 4);

  return (
    <main className='mx-auto flex w-full max-w-6xl flex-1 flex-col px-2 py-4 sm:px-3 lg:px-4'>
      <section className='relative overflow-hidden px-3 py-6 sm:px-5 sm:py-8'>
        <div className=''>
          <h1 className='text-ui-fg font-mono text-4xl leading-tight font-semibold tracking-[0.08em] uppercase sm:text-5xl'>
            Ulises Daniel Alanis
          </h1>
        </div>
        <p className='text-ui-fg text-base leading-8 sm:text-lg'>
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
            className='bg-syn-fun text-ui-bg-m3 hover:bg-syn-type inline-flex border border-transparent px-4 py-3 text-xs font-bold tracking-[0.24em] uppercase transition'
          >
            Open Projects
          </a>
        </div>
      </section>

      <section className='mt-4 grid lg:grid-cols-[0.9fr_1.1fr]'>
        <div className='p-3 sm:p-4'>
          <p className='text-syn-comment mb-4 font-mono text-xs tracking-[0.3em] uppercase'>
            Selected Work
          </p>
          <h2 className='text-syn-parameter font-mono text-3xl leading-tight font-semibold uppercase'>
            {featuredProject?.name ?? 'Project Archive'}
          </h2>
          <p className='text-ui-fg mt-5 text-base leading-7'>
            {getProjectDescription(featuredProject)}
          </p>
          {(featuredProject?.tools?.length ?? 0) > 0 && (
            <div className='border-ui-float-fg-border mt-6 border-t pt-4'>
              <p className='text-syn-comment text-xs tracking-[0.24em] uppercase'>
                Stack
              </p>
              <p className='text-syn-parameter mt-2 text-sm leading-7 uppercase'>
                {featuredProject?.tools?.join(' / ')}
              </p>
            </div>
          )}
          <div className='mt-4 flex flex-wrap gap-3'>
            {featuredProject && (
              <a
                href={`https://github.com/${featuredProject.owner}/${featuredProject.project}`}
                target='_blank'
                rel='noopener noreferrer'
                className='text-syn-type hover:text-syn-fun text-sm tracking-[0.2em] uppercase'
              >
                Open repository
              </a>
            )}
          </div>
        </div>

        <div className='grid gap-px'>
          {topProjects.map((project, i) => (
            <div
              key={project.name}
              className='border-ui-float-fg-border p-3 sm:p-4'
            >
              <p className='text-syn-keyword text-ls font-mono tracking-[0.28em] uppercase'>
                {`0${i + 1} / ${project.name}`}
              </p>
              <p className='text-ui-fg mt-3 text-sm leading-8'>
                {getProjectDescription(project)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
