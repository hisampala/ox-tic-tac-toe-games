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
RUN turbo prune --scope=web --docker

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

ARG NEXT_PUBLIC_BASE_API_URL
ENV NEXT_PUBLIC_BASE_API_URL=${NEXT_PUBLIC_BASE_API_URL}
RUN echo "NEXT_PUBLIC_BASE_API_URL=${NEXT_PUBLIC_BASE_API_URL}" >> ./apps/web/.env.local

ARG CLIENT_ID_GOOGLE
ENV CLIENT_ID_GOOGLE=${CLIENT_ID_GOOGLE}
RUN echo "CLIENT_ID_GOOGLE=${CLIENT_ID_GOOGLE}" >> ./apps/web/.env.local

ARG CLIENT_SECRET_GOOGLE
ENV CLIENT_SECRET_GOOGLE=${CLIENT_SECRET_GOOGLE}
RUN echo "CLIENT_SECRET_GOOGLE=${CLIENT_SECRET_GOOGLE}" >> ./apps/web/.env.local

ARG CLIENT_ID_GITHUB
ENV CLIENT_ID_GITHUB=${CLIENT_ID_GITHUB}
RUN echo "CLIENT_ID_GITHUB=${CLIENT_ID_GITHUB}" >> ./apps/web/.env.local

ARG CLIENT_SECRET_GITHUB
ENV CLIENT_SECRET_GITHUB=${CLIENT_SECRET_GITHUB}
RUN echo "CLIENT_SECRET_GITHUB=${CLIENT_SECRET_GITHUB}" >> ./apps/web/.env.local

ARG SECRET_KEY
ENV SECRET_KEY=${SECRET_KEY}
RUN echo "SECRET_KEY=${SECRET_KEY}" >> ./apps/web/.env.local

RUN pnpm run prisma:generate
RUN pnpx turbo run build --filter=web... && pnpm prune --prod

# Runner stage
FROM node:18-alpine AS runner
WORKDIR /app

RUN npm i sharp
RUN addgroup --system --gid 1001 ox-group
RUN adduser --system --uid 1001 ox-developer
USER ox-developer

COPY --from=installer /app/apps/web/next.config.mjs .
COPY --from=installer /app/apps/web/package.json .
COPY --from=installer /app/apps/web/.env.local .

COPY --from=installer --chown=ox-developer:ox-group /app/apps/web/.next/standalone ./
COPY --from=installer --chown=ox-developer:ox-group /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=ox-developer:ox-group /app/apps/web/public ./apps/web/public

ARG PORT
ENV PORT=${PORT}
RUN echo "PORT EXPOSE =${PORT}"
EXPOSE ${PORT}

CMD ["node", "apps/web/server.js"]
