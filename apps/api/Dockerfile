# syntax=docker/dockerfile:1
ARG NODE_VERSION=22.2.0
ARG PNPM_VERSION=8.15.5

# Build stage
FROM node:${NODE_VERSION}-alpine AS build
RUN apk add --no-cache libc6-compat
RUN apk update
RUN npm install -g pnpm@${PNPM_VERSION}

WORKDIR /app

COPY . .

RUN --mount=type=cache,target=/root/.npm \
    pnpm install --frozen-lockfile --ignore-scripts

RUN npm i -g turbo
RUN turbo prune --scope=api --docker

# Installer stage
FROM node:18-alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
RUN npm install -g pnpm@${PNPM_VERSION}
COPY .gitignore .gitignore

COPY --from=build /app/out/json/ .
COPY --from=build /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --ignore-scripts

COPY --from=build /app/out/full/ .
COPY turbo.json turbo.json
RUN pnpm run prisma:generate
RUN pnpx turbo run build --filter=api... && pnpm prune --prod

# Runner stage
FROM node:18-alpine AS runner
WORKDIR /app
RUN touch .env

RUN npm i sharp
RUN addgroup --system --gid 1001 ox-group
RUN adduser --system --uid 1001 ox-developer
USER ox-developer


# node_modules #
COPY --from=installer /app/package.json ./package.json
COPY --from=installer /app/pnpm-lock.yaml ./pnpm-lock.yaml 
COPY --from=installer /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=installer /app/node_modules ./node_modules

# repository #
COPY --from=installer --chown=ox-developer:ox-group /app/packages/repository/package.json ./packages/repository/package.json
COPY --from=installer --chown=ox-developer:ox-group /app/packages/repository/dist ./packages/repository/dist
COPY --from=installer --chown=ox-developer:ox-group /app/packages/repository/node_modules ./packages/repository/node_modules
# schema #
COPY --from=installer --chown=ox-developer:ox-group /app/packages/schema/package.json ./packages/schema/package.json
COPY --from=installer --chown=ox-developer:ox-group /app/packages/schema/dist ./packages/schema/dist
COPY --from=installer --chown=ox-developer:ox-group /app/packages/schema/node_modules ./packages/schema/node_modules

#api
COPY --from=installer --chown=ox-developer:ox-group /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=installer --chown=ox-developer:ox-group /app/apps/api/dist ./apps/api/dist

ENV PORT=3333
EXPOSE 3333

CMD node ./apps/api/dist/index.cjs