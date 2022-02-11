# gh-trending-repos

https://gh-trending-repos.vercel.app/

A simple app to discover trending repositories and save them for later.

## Prerequisites

- Node v14.19.0 (recommended to use [nvm](https://github.com/nvm-sh/nvm))
- npm v8.4.1

## Technology

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prettier](https://prettier.io/)
- [ESLint](https://nextjs.org/docs/basic-features/eslint) (via Next)
- [husky](https://github.com/typicode/husky) + [lint-staged](https://github.com/okonet/lint-staged)
- [Jest](https://jestjs.io/)
- [Playwright](https://playwright.dev/)

## Recommended VSCode Extensions

- Prettier
- ESLint
- Headwind (class sorter for Tailwind CSS)
- Tailwind CSS IntelliSense

## Development

### Setup

```bash
npm i
```

### Running the application

```bash
npm run dev
```

### Testing the application

#### Unit Tests

```bash
npm run test
```

#### E2E Tests

This project utilises Playwright for end-to-end tests. Tests are located in the `./tests/e2e` folder, and `./playwright.config.ts` contains the test config to e.g. test on multiple browsers.

Ensure you have the application running locally, and then run;

```bash
npm run test:e2e
```
