# HelloClient Headless Sidebar Test Task

This project implements the HelloClient test assignment: reusable headless sidebar navigation in React and TypeScript, with a Tailwind-styled consumer, React Router integration, and mobile adaptation.

## Status

Phase 1 project scaffolding is complete. The current application is a smoke target for the toolchain and does not implement sidebar behavior yet.

## Prerequisites

- Node.js `22.13.0` or newer. Node 22 is recorded in `.nvmrc`.
- npm.

## Setup

The project uses only public npm packages. If your global npm configuration points to a private registry, select the public registry for the install command:

```bash
npm ci --registry=https://registry.npmjs.org
```

## Commands

```bash
npm run dev
npm run type-check
npm run lint
npm test -- --run
npm run build
npm run preview
```

The Vite development server uses `http://localhost:5173` by default.

## Core Principles

- JSX compound components instead of menu configuration.
- Headless behavior is independent of React Router and Tailwind.
- Desktop expanded, desktop collapsed, and mobile bottom navigation use one state machine.
- Collapsed submenu uses an accessible flyout.
- Mobile submenu uses a modal bottom sheet.
- Router and `useState` examples share one public component API.

## Stack

- React.
- TypeScript strict.
- Vite.
- Tailwind CSS.
- React Router.
- Vitest and React Testing Library.
- `lucide-react`.
- GitHub Pages.

Dependency versions are pinned in `package.json` and `package-lock.json`.
