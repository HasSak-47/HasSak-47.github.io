# Daniel Alanis Portfolio

Personal portfolio site for showcasing systems-oriented software projects, with a dedicated home page and a projects archive.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- `pnpm` for package management

## Structure

- `src/App.tsx`: homepage, hash-based navigation, and projects page layout
- `src/Project.tsx`: project card component and README expansion
- `public/data.json`: portfolio content source
- `docs/`: production build output for GitHub Pages

## Content Model

Project data is stored in `public/data.json`. The homepage and projects page read from that file, so updating project entries updates the site content.

## Notes

- The site uses hash routing: `#/` for home and `#/projects` for the archive.
- `docs/` is the deploy target for GitHub Pages.
- The `build` script in `package.json` currently runs through `bunx --bun vite build`; `pnpm exec vite build` is the more reliable direct build command in this repo right now.
