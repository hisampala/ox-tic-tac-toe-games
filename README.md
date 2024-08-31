# Ox Games | Tic Tac Toe
This is a web application, Tic Tac Toe game, developed with Typescript programming language and Nextjs + Honojs + Prisma framework.

## Features

- SignIn With OAuth | github google
- play a games Of Tic Tac Toe
- watch score board

## Installation

requires [Node.js](https://nodejs.org/) v16+ to run.
requires [pnpm package manager](https://pnpm.io/) v8.9.0+ to install dependencies.

Install the dependencies and devDependencies and start the server.

```sh
cd ox-tic-tac-toe-games
pnpm i
```
## Prepare Env. For start Program 
for api | from ./apps/api/.env
```sh
DATABASE_URL="<Your PostgreSQL database connection URL>"
CORS_ORIGIN="<URL(s) allowed to access the API>" 
// If there are multiple URLs, separate them with a comma, e.g., http://example1.com, http://example2.com
```
for web | from ./apps/web/.env.local
```sh
CLIENT_ID_GOOGLE="<Your Google OAuth client ID>" 
CLIENT_SECRET_GOOGLE="<Your Google OAuth client secret>"
CLIENT_ID_GITHUB="<Your GitHub OAuth client ID>"
CLIENT_SECRET_GITHUB="<Your GitHub OAuth client secret>"
SECRET_KEY="<A secret key for session encryption>"
NEXT_PUBLIC_BASE_API_URL="<Base URL for API endpoint>"
```
[Learn how to obtain Google OAuth credentials. ](https://www.balbooa.com/help/gridbox-documentation/integrations/other/google-client-id)
[Learn how to obtain Github OAuth credentials. ](https://support.heateor.com/get-github-client-id-client-secret/)
## Start Program 
api 
```sh
pnpm dev:api
```
web 
```sh
pnpm dev:web
```


## License

MIT

**Free Software**

