# 1. Basic image
FROM node:20-alpine AS base
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml ./

# ----------------------------------------------------
# 2. Development stage
# ----------------------------------------------------
FROM base AS development
ENV NODE_ENV=development
RUN pnpm install
COPY . .
EXPOSE 8080
CMD ["pnpm", "start:dev"]

# ----------------------------------------------------
# 3. Build stage
# ----------------------------------------------------
FROM base AS build
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build
RUN pnpm prune --prod

# ----------------------------------------------------
# 4. Final production image
# ----------------------------------------------------
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json

EXPOSE 8080
USER node
CMD ["node", "dist/main.js"]