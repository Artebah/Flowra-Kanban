# 1. Base image
FROM node:20-alpine AS base
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml ./

# ----------------------------------------------------
# 2. Development stage (Vite dev server)
# ----------------------------------------------------
FROM base AS development
RUN pnpm install
COPY . .
EXPOSE 5173
# Bind to 0.0.0.0 to accept connections from outside the container
CMD ["pnpm", "run", "dev", "--", "--host", "0.0.0.0"]

# ----------------------------------------------------
# 3. Build stage (Compile production bundle)
# ----------------------------------------------------
FROM base AS build
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

# ----------------------------------------------------
# 4. Production stage (Serve static files via Nginx)
# ----------------------------------------------------
FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]