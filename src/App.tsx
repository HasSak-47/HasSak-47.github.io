import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useEffect, useState } from 'react';

import Projects from './Project';
import Home from './Home';

const themes = ['wave', 'dragon', 'lotus'] as const;

type ThemeName = (typeof themes)[number];

interface LinkProps {
  icon: React.ElementType;
  name: string;
  href: string;
}

function Link({ icon: Icon, name, href }: LinkProps) {
  return (
    <a
      href={href}
      className='text-syn-type hover:text-syn-fun hover:border-ui-float-fg-border inline-flex items-center gap-2 px-3 py-2 text-xs tracking-[0.22em] uppercase transition'
      target='_blank'
      rel='noopener noreferrer'
    >
      <Icon className='h-5 w-5' />
      {name}
    </a>
  );
}

function getStoredTheme(): ThemeName {
  const storedTheme = localStorage.getItem('theme');
  return themes.includes(storedTheme as ThemeName)
    ? (storedTheme as ThemeName)
    : 'wave';
}

function ThemeSwitcher({
  theme,
  setTheme,
}: {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}) {
  return (
    <div
      className='flex flex-wrap items-center gap-4'
      aria-label='Theme'
      role='group'
    >
      {themes.map((themeName) => (
        <button
          key={themeName}
          type='button'
          className={`border-b px-1 py-2 text-xs tracking-[0.25em] uppercase transition sm:text-sm ${
            theme === themeName
              ? 'border-syn-fun text-syn-fun'
              : 'text-ui-fg/70 hover:text-syn-type border-transparent'
          }`}
          onClick={() => setTheme(themeName)}
          aria-pressed={theme === themeName}
        >
          {themeName}
        </button>
      ))}
    </div>
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
      className={`border-b px-1 py-2 text-xs tracking-[0.25em] uppercase transition sm:text-sm ${
        active
          ? 'text-syn-fun border-ui-float-fg-border'
          : 'text-ui-fg/70 hover:text-syn-type border-transparent'
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

export default function App() {
  const [route, setRoute] = useState('/');
  const [theme, setTheme] =
    useState<ThemeName>(getStoredTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const syncRoute = () => setRoute(getRoute());
    syncRoute();
    window.addEventListener('hashchange', syncRoute);
    return () =>
      window.removeEventListener('hashchange', syncRoute);
  }, []);

  return (
    <div className='bg-ui-bg flex min-h-screen w-full min-w-50 flex-col'>
      <header className='bg-ui-bg-gutter border-ui-float-fg-border sticky top-0 z-20 border-b px-4 py-5 shadow-md backdrop-blur sm:px-6 lg:px-8'>
        <div className='mx-auto flex max-w-6xl flex-col-reverse gap-4 sm:flex-row-reverse sm:items-center sm:justify-between'>
          <ThemeSwitcher
            theme={theme}
            setTheme={setTheme}
          />
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

      <div className='from-ui-bg-p1 to-ui-bg-dim text-ui-fg flex-1 bg-linear-to-br'>
        {route === '/projects' ? <Projects /> : <Home />}
      </div>

      <footer className='bg-ui-bg-dim text-ui-fg border-ui-bg-p1 border-t px-4 py-6'>
        <div className='mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row'>
          <div className='text-syn-comment text-xs tracking-[0.24em] uppercase'></div>
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
