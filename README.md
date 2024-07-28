# Poke Card Creator

A code challenge involving pokemon cards
Note: You can find the project repo at https://github.com/sebastianpennino/poke-challenge

## Tech Stack

- [Remix](https://remix.run/) (brief explanation of [Remix concepts](docs/remix.md) in case you need them)
- [React 18.3.1](https://react.dev/) with [TypeScript](https://typescriptlang.org)
- Email/Password Authentication with [cookie-based sessions](https://remix.run/utils/sessions#creatememorysessionstorage)
- Database ORM with [Prisma](https://prisma.io) (brief explanation of [Prisma concepts](docs/prisma.md) in case you need them)
- To upload and cache pokemon images I'm using [Redis](https://redis.io/)
- Styling with [Tailwind](https://tailwindcss.com/)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org) (configured in `.eslintrc.js`).

🔴 **TODO / PENDING** 🔴

- End-to-end testing with [Cypress](https://cypress.io)
- Local third party request mocking with [MSW](https://mswjs.io)
- Unit testing with [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com)

## Running the project locally

### Prerequisites

You should have installed on your machine:

- [Docker](https://www.docker.com/get-started)
- [NodeJS](https://nodejs.org/en) (version 18+)

Also you will need a local `.env` file

- create a .env file on the root of the project (copying `.env.sample`)

### Instructions

- Start the Postgres Database in Docker by running:

  ```sh
  npm run docker
  ```

  > **Note:** The npm script will complete while Docker sets up the container in the background.
  > Sometimes this fails and needs to be run again.
  > Make sure your container is running before proceeding.

- Initial setup:

  ```sh
  npm run setup
  ```

- Run the first build:

  ```sh
  npm run build
  ```

- Start dev server:

  ```sh
  npm run dev
  ```

This starts your app in development mode, rebuilding assets on file changes.

The database [seed script](prisma/seed.ts) will create a new user with some data (some cards to interact with) you can use to get started:

- Email: `cu@gmail.com`
- Password: `welcome123`

### Relevant code:

- cards (and all the CRUD operations) [./app/models/card.server.ts](./app/models/card.server.ts)

## My Assumptions:

As part of the assignment, a document outlining the assumptions and the implemented solution was requested. You can review those here:

- [My Assumptions](docs/assumptions.md)
- [Decisions and Implementation Details](docs/implementation.md)

## Testing

🔴 TODO: PENDING 🔴

### Cypress (e2e)

🔴 TODO: PENDING 🔴

Using Cypress for End-to-End tests in this project. You'll find those in the `cypress` directory. As you make changes, add to an existing file or create a new file in the `cypress/e2e` directory to test your changes.

Using [`@testing-library/cypress`](https://testing-library.com/cypress) for selecting elements on the page semantically.

To run these tests in development, run `npm run test:e2e:dev` which will start the dev server for the app as well as the Cypress client. Make sure the database is running in docker as described above.

### Vitest (unit test)

🔴 TODO: PENDING 🔴

Using `vitest` for lower level tests of utilities and individual components. Using DOM-specific assertion helpers via [`@testing-library/jest-dom`](https://testing-library.com/jest-dom).

## Other stuff

### Database connection (locally)

Use this data in case you need to connect to the DB

username: `postgres`
password: `postgres`
port: `5432`

### Type Checking

In case you need to run type checking across the whole project, run `npm run typecheck`.

### Formatting

Using [Prettier](https://prettier.io/) for auto-formatting in this project. There's also a `npm run format` script you can run to format all files in the project.
