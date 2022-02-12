FROM node:14-alpine3.14

RUN apk update

# Normally run as node user
USER node

# Install dependencies
ADD --chown=node:node ["./package.json", "./yarn.lock", "/app/"]
WORKDIR /app

RUN --mount=type=cache,uid=1000,gid=1000,target=.yarn-cache \
    yarn install \
    --ignore-optional \
    --non-interactive \
    --cache-folder .yarn-cache

# Bundle sources
ADD --chown=node:node [".", "/app/"]
RUN yarn build

# Configuration for running
EXPOSE 3000
ENV NODE_ENV=production
CMD ["yarn", "start"]

