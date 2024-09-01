# Ox Games | Tic Tac Toe

"Ox Games | Tic Tac Toe" is a web application for playing Tic Tac Toe, developed using TypeScript and the Next.js, Hono.js, and Prisma frameworks.

## Features

- Sign in with OAuth | GitHub, Google
- Play a game of Tic Tac Toe
- View the scoreboard

## Installation

Requires [Node.js](https://nodejs.org/) v16+ and [pnpm package manager](https://pnpm.io/) v8.9.0+ for dependency management.

1. Install dependencies and devDependencies and start the server:

    ```sh
    cd ox-tic-tac-toe-games
    pnpm i
    ```

## Environment Setup

### For API (from `./apps/api/.env`):

    ```sh
    DATABASE_URL="<Your PostgreSQL database connection URL>"
    CORS_ORIGIN="<URL(s) allowed to access the API>"
    // If there are multiple URLs, separate them with a comma, e.g., http://example1.com, http://example2.com
    ```

### For Web (from `./apps/web/.env.local`):

    ```sh
    CLIENT_ID_GOOGLE="<Your Google OAuth client ID>"
    CLIENT_SECRET_GOOGLE="<Your Google OAuth client secret>"
    CLIENT_ID_GITHUB="<Your GitHub OAuth client ID>"
    CLIENT_SECRET_GITHUB="<Your GitHub OAuth client secret>"
    SECRET_KEY="<A secret key for session encryption>"
    NEXT_PUBLIC_BASE_API_URL="<Base URL for API endpoint>"
    ```

[Learn how to obtain Google OAuth credentials](https://www.balbooa.com/help/gridbox-documentation/integrations/other/google-client-id)

[Learn how to obtain GitHub OAuth credentials](https://support.heateor.com/get-github-client-id-client-secret/)

## Starting the Application

### For API

    ```sh
    pnpm dev:api
    ```

### For Web

    ```sh
    pnpm dev:web
    ```

## Running with Docker

1. Build the Docker images:

    Prepare environment variables for building the images.

    - For Web (from `ox-tic-tac-toe-games/.env`):

      ```sh
      CLIENT_ID_GOOGLE="<Your Google OAuth client ID>"
      CLIENT_SECRET_GOOGLE="<Your Google OAuth client secret>"
      CLIENT_ID_GITHUB="<Your GitHub OAuth client ID>"
      CLIENT_SECRET_GITHUB="<Your GitHub OAuth client secret>"
      SECRET_KEY="<A secret key for session encryption>"
      NEXT_PUBLIC_BASE_API_URL="<Base URL for API endpoint>"
      PORT="<Port for starting the web application>"
      ```

    - For API (from `ox-tic-tac-toe-games/.env`):

      ```sh
      DATABASE_URL="<Your PostgreSQL database connection URL>"
      API_PORT="<Port for starting the API>"
      CORS_ORIGIN="<URL(s) allowed to access the API>"
      // If there are multiple URLs, separate them with a comma, e.g., http://example1.com, http://example2.com
      ```

2. Build and run Web:

    ```sh
    $ WEB_IMAGE=<image name>  docker compose -f ./compose.build.yaml build web
    $ WEB_IMAGE=<image name>  docker compose -f ./docker-compose.web-hub.yaml up -d
    ```

3. Build and run API:

    ```sh
    $ API_IMAGE=<image name>  docker compose -f ./compose.build.yaml build api
    $ API_IMAGE=<image name>  docker compose -f ./docker-compose.api-hub.yaml up -d
    ```

## Database Migration

To handle database migrations with Prisma, you can use the `migrate:database` script. This script applies any pending database migrations to your database.

### Running Database Migrations

To apply migrations to your database, run the following command:

    ```sh
    pnpm migrate:database
    ```

This command will execute the Prisma `migrate deploy` command, which will apply any new migration files to your database.

### Important Notes

- Ensure that your Prisma configuration is correctly set up in your `.env` file, and that your database connection details are accurate.
- It is a good practice to run this command in your deployment pipeline or after making changes to your Prisma schema to ensure that your database schema stays in sync with your application code.
- If you encounter issues, check the Prisma documentation or review the migration logs for troubleshooting.

## License

MIT

**Free Software**
