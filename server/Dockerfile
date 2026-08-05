FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./
COPY . .

RUN pnpm install --frozen-lockfile

RUN pnpm --filter @flowra/server build

EXPOSE 8080

CMD ["node", "dist/main.js"]