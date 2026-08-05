# Flowra Kanban

> A full-stack collaborative Kanban board application — organize work visually, manage tasks with rich details, and collaborate with your team in real time.

![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white) ![NestJS](https://img.shields.io/badge/NestJS-10-E0234E?style=flat-square&logo=nestjs&logoColor=white) ![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=flat-square&logo=postgresql&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white) ![Cloudflare R2](https://img.shields.io/badge/Cloudflare-R2-F38020?style=flat-square&logo=cloudflare&logoColor=white)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Features](#2-features)
3. [Tech Stack](#3-tech-stack)
4. [Architecture & Project Structure](#4-architecture--project-structure)
5. [Data Model & Database Schema](#5-data-model--database-schema)
6. [Environment Variables](#6-environment-variables)
7. [Installation & Local Setup](#7-installation--local-setup)
8. [Commands & Scripts](#8-commands--scripts)
9. [API Reference](#9-api-reference)
10. [Integrations & External Services](#10-integrations--external-services)
11. [Security & Performance](#11-security--performance)
12. [Testing & Deployment](#12-testing--deployment)

---

## 1. Project Overview

**Flowra Kanban** is a production-ready, full-stack project management tool modeled after Trello and Linear. It solves the core problem of visual work coordination for small-to-medium teams: organizing tasks across customizable board columns, assigning responsibilities, tracking deadlines, and collaborating through rich task descriptions and file attachments.

**Target audience:** Product teams, developers, and knowledge workers who need a self-hostable, privacy-first alternative to SaaS Kanban tools.

**Core problems solved:**

- Drag-and-drop task management with persistent fractional ordering (no reindex needed)
- Role-based board access control (owner → admin → member)
- Rich text task descriptions (Tiptap / ProseMirror JSON stored as JSONB)
- Direct-to-cloud file uploads via Cloudflare R2 presigned URLs (server never holds file bytes)
- JWT access + refresh token rotation with silent re-authentication

---

## 2. Features

### Authentication & User Management

- **Email + password registration** with bcrypt hashing
- **JWT access / refresh token** pair — access tokens (short TTL) and refresh tokens (long TTL) are independently configurable
- **Silent token refresh** — the frontend Axios interceptor automatically retries a failed request after refreshing the access token; on failure it clears state and redirects to login
- **Profile completion flow** — after registration users are routed to `/complete-profile` to set a username and avatar before accessing the app
- **Global user search** — search users by email or username to invite to boards

### Boards

- **Create boards** with a custom title, cover image URL, or background color
- **Delete boards** (owner only, cascades to all child data)
- **Role-based membership:** three roles — `owner`, `admin`, `member`
  - Owners and admins can add members
  - Any member can self-remove
- **Board labels** — create color-coded labels scoped to a board; reuse them across tasks

### Columns

- **Create, rename, and delete columns** within a board
- **Column reordering** — drag to reorder; order is persisted as integer sequence
- **Per-column color accent** (optional)

### Tasks

- **Create tasks** in any column with a title
- **Rich text description** — powered by Tiptap (with image embedding support); stored as ProseMirror JSON in a `jsonb` column; a separate `text` column stores a plain-text extract for search
- **Fractional task ordering** — task position stored as `decimal(20,15)`, enabling insertion between any two tasks without renumbering
- **Cross-column drag-and-drop** — move tasks between columns; order and `columnId` are updated atomically
- **Task completion toggle** — mark tasks done with a visual checkbox
- **Due dates** — assign a date/time to a task via a calendar picker
- **Label assignment** — attach multiple board-level labels to a task; create new labels directly from the task detail modal
- **Member assignment** — assign multiple board members to a task
- **File attachments** — upload files directly to Cloudflare R2 via presigned URL; multiple attachments per task; remove individual attachments
- **Task detail modal** — full overlay with all task metadata, description editor, attachments, labels, members, and due date

### UI / UX

- **Drag-and-drop** for both columns and tasks using `@dnd-kit/core` + `@dnd-kit/sortable`
- **Optimistic UI** — local state updates immediately on drag; server sync happens in the background
- **Toast notifications** — `react-hot-toast` surfaces API errors globally
- **Responsive layout** — TailwindCSS v4 utility classes
- **shadcn/ui component library** — accessible, composable primitives (Dialog, Popover, DropdownMenu, Calendar, Checkbox, Select)
- **Dark/light theme** support via shadcn/ui

---

## 3. Tech Stack

### Backend

| Technology | Version | Purpose |
| --- | --- | --- |
| Node.js | ≥ 20 | Runtime |
| NestJS | ^10.0.0 | Application framework (controllers, modules, DI) |
| TypeScript | ~5.8.3 | Language |
| TypeORM | ^0.3.20 | ORM & query builder |
| PostgreSQL | 15 | Primary relational database |
| Passport.js | ^0.7.0 | Authentication middleware |
| passport-jwt | ^4.0.1 | JWT strategy |
| passport-local | ^1.0.0 | Local (email/password) strategy |
| @nestjs/jwt | ^10.2.0 | JWT signing / verification |
| bcrypt | ^5.1.1 | Password hashing |
| class-validator | ^0.14.1 | DTO validation decorators |
| class-transformer | ^0.5.1 | Serialization / `@Expose()` whitelist |
| @aws-sdk/client-s3 | ^3.782.0 | Cloudflare R2 (S3-compatible) client |
| @aws-sdk/s3-request-presigner | ^3.782.0 | Presigned URL generation |
| Joi | ^17.13.3 | Environment variable schema validation |
| @nestjs/config | ^3.3.0 | Config module |
| rxjs | ^7.8.1 | NestJS internals |

### Frontend

| Technology | Version | Purpose |
| --- | --- | --- |
| React | ^19.0.0 | UI library |
| TypeScript | ~5.8.3 | Language |
| Vite | ^6.3.1 | Build tool & dev server |
| TailwindCSS | ^4.1.5 | Utility-first CSS (via `@tailwindcss/vite`) |
| React Router DOM | ^7.5.1 | Client-side routing |
| TanStack Query (React Query) | ^5.74.4 | Server state management, caching, mutations |
| Zustand | ^5.0.3 | Client state management (slices pattern) |
| Axios | ^1.8.4 | HTTP client with interceptors |
| @dnd-kit/core | ^6.3.1 | Drag-and-drop core |
| @dnd-kit/sortable | ^10.0.0 | Sortable list abstraction |
| Tiptap | ^2.11.5 | Rich text editor (ProseMirror-based) |
| shadcn/ui | (latest) | Accessible component primitives |
| Radix UI | (various) | Headless UI primitives backing shadcn/ui |
| react-hot-toast | ^2.5.2 | Toast notifications |
| date-fns | ^4.1.0 | Date formatting |
| lucide-react | ^0.488.0 | Icon library |

### Infrastructure & DevOps

| Technology | Purpose |
| --- | --- |
| Docker + Docker Compose | Containerized local and production deployment |
| pnpm workspaces | Monorepo package management |
| PostgreSQL 15 (Alpine) | Database container |
| Cloudflare R2 | Object storage (S3-compatible) |
| Vercel | Frontend production hosting (configured via `vercel.json`) |

---

## 4. Architecture & Project Structure

### Architectural Patterns

- **Backend:** Modular Monolith following NestJS conventions — each domain (boards, columns, tasks, labels, auth, users, storage) lives in its own feature module with controller → service → repository layering. Cross-cutting concerns (guards, decorators, base entities, pipes) reside in `common/`.
- **Frontend:** Feature-adjacent file organization — hooks, components, and types live near the features they serve. Global state is managed by Zustand (three slices composed into one store); server state (caching, invalidation, mutations) is managed exclusively by TanStack Query.
- **API style:** REST over HTTP with JSON payloads.
- **Auth flow:** Stateless JWT — no server-side sessions. Access tokens are short-lived; refresh tokens are long-lived. Both are stored in `localStorage` on the client.
- **File upload:** Client-side direct upload pattern — the server generates a presigned PUT URL; the client uploads directly to R2; the server only persists the resulting public URL.

### Directory Tree

```
Flowra-Kanban/
├── .env                          # Shared environment variables
├── docker-compose.yml            # Orchestrates backend, frontend, db containers
├── package.json                  # Monorepo root scripts + devDependencies
├── pnpm-workspace.yaml           # Defines workspaces: client, server
├── tsconfig.json                 # Root TypeScript project references
├── .prettierrc.json
│
├── client/                       # React + Vite frontend
│   ├── Dockerfile
│   ├── vercel.json               # Vercel deployment config (SPA rewrites)
│   ├── vite.config.ts            # Vite + TailwindCSS plugin + path alias @→src
│   ├── components.json           # shadcn/ui configuration
│   └── src/
│       ├── main.tsx              # App entry: QueryClient + Router + Toaster
│       ├── App.tsx               # Route definitions
│       ├── pages/
│       │   ├── LoginPage.tsx
│       │   ├── SignupPage.tsx
│       │   ├── CompleteProfilePage.tsx
│       │   ├── HomePage.tsx      # Board list
│       │   └── BoardPage.tsx     # Kanban board view
│       ├── components/
│       │   ├── board/            # Board-level UI (Column, Task, AddColumnForm…)
│       │   ├── ui/               # shadcn/ui primitives
│       │   └── …                 # Shared components (Header, CreateBoard…)
│       ├── hooks/
│       │   └── api/              # TanStack Query hooks (one file per resource)
│       ├── services/
│       │   └── api/
│       │       └── axiosInstance.ts  # Axios with auth + refresh interceptors
│       ├── store/                # Zustand store + slices (column, task, ui)
│       ├── layouts/              # ProtectedLayout, BoardLayout
│       ├── hoc/                  # AuthGuard HOC
│       ├── constants/            # API route constants
│       ├── types/                # Shared TypeScript interfaces/types
│       └── utils/                # Helper functions
│
└── server/                       # NestJS backend
    ├── Dockerfile
    ├── nest-cli.json
    ├── webpack.config.js
    └── src/
        ├── main.ts               # Bootstrap: CORS, ValidationPipe, ClassSerializer
        ├── app.module.ts         # Root module: registers all feature modules
        ├── config/
        │   └── app.config.ts     # Joi schema for env var validation
        ├── db/
        │   └── migrations/       # 26 TypeORM migration files
        ├── common/
        │   ├── entities/
        │   │   └── base.entity.ts        # Abstract base with createdAt/updatedAt
        │   ├── guards/
        │   │   ├── board-access.guard.ts # Verifies user is a board member
        │   │   └── board-role.guard.ts   # Verifies user meets role requirement
        │   ├── decorators/
        │   │   ├── user.decorator.ts     # @UserDecorator() — extracts JWT payload
        │   │   └── roles.decorator.ts    # @Roles(...) — sets role metadata
        │   └── types/
        │       └── jwt-payload.type.ts
        ├── auth/
        │   ├── auth.module.ts
        │   ├── auth.controller.ts        # POST /auth/register|login|refresh
        │   ├── auth.service.ts           # register, login, refresh logic
        │   ├── guards/                   # JwtAuthGuard, LocalAuthGuard, RefreshAuthGuard
        │   └── strategies/              # JwtStrategy, LocalStrategy, RefreshJwtStrategy
        ├── users/
        │   ├── users.module.ts
        │   ├── users.controller.ts       # GET /users, GET /users/me, PATCH complete-profile
        │   ├── users.service.ts
        │   ├── entities/user.entity.ts
        │   └── dto/
        ├── boards/
        │   ├── boards.module.ts
        │   ├── boards.controller.ts      # CRUD + members + labels sub-routes
        │   ├── boards.service.ts
        │   ├── entities/
        │   │   ├── board.entity.ts
        │   │   └── board-member.entity.ts
        │   └── dto/
        ├── columns/
        │   ├── columns.module.ts
        │   ├── columns.controller.ts     # CRUD + reorder
        │   ├── columns.service.ts
        │   ├── entities/column.entity.ts
        │   └── dto/
        ├── tasks/
        │   ├── tasks.module.ts
        │   ├── tasks.controller.ts       # CRUD + labels + members + attachments + reorder
        │   ├── tasks.service.ts
        │   ├── entities/
        │   │   ├── task.entity.ts
        │   │   └── task-attachment.entity.ts
        │   └── dto/
        ├── labels/
        │   ├── labels.module.ts
        │   ├── labels.service.ts
        │   ├── entities/label.entity.ts
        │   └── dto/
        └── storage/
            ├── storage.module.ts
            ├── storage.controller.ts     # POST /upload-url
            └── storage.service.ts        # Generates R2 presigned PUT URLs
```

### Data Flow

```
Browser
  │  HTTP request (Bearer token in Authorization header)
  ▼
NestJS Guards (JwtAuthGuard → BoardAccessGuard → BoardRoleGuard)
  │  Guard chain — any failure throws 401/403
  ▼
Controller  →  DTO validation (class-validator / ValidationPipe)
  │  Validated request body / params / query
  ▼
Service  →  TypeORM Repository
  │  Database query / mutation
  ▼
Response  →  ClassSerializerInterceptor strips @Exclude() fields
  │  JSON response
  ▼
Browser (Axios)
  │  On 401: refresh token → retry original request
  ▼
TanStack Query cache update / invalidation
  │
Zustand local state (columns, tasks) update for optimistic UI
```

### Error Handling & Validation

- **DTO validation:** `ValidationPipe` with `whitelist: true` runs globally; unknown properties are stripped; invalid requests return `400 Bad Request` with a structured error array.
- **Serialization:** `ClassSerializerInterceptor` with `strategy: 'excludeAll'` means only properties explicitly decorated with `@Expose()` are returned — prevents accidental data leaks (e.g. password hashes).
- **HTTP exceptions:** Services throw NestJS `HttpException` subclasses (`NotFoundException`, `ForbiddenException`, `ConflictException`); NestJS's built-in exception filter converts them to structured JSON responses.
- **Frontend error handling:** The Axios response interceptor catches all non-2xx responses and displays a `react-hot-toast` error; 401s trigger silent refresh before propagating.

---

## 5. Data Model & Database Schema

### Entity Relationship Summary

```
User ──< BoardMember >── Board ──< BoardColumn ──< Task >── TaskAttachment
                                        │
                                      Label ──< Task (M:N via task_labels)
                                                │
                                              User (M:N via assigned_members_to_task)
```

### Entities

#### `users`

| Column | Type | Constraints | Notes |
| --- | --- | --- | --- |
| `id` | `uuid` | PK, generated |  |
| `username` | `varchar` | nullable | Set during profile completion |
| `password` | `varchar` | not null | bcrypt hash |
| `email` | `varchar` | not null |  |
| `isProfileCompleted` | `boolean` | default `false` | Gated by `/complete-profile` |
| `avatar` | `varchar` | nullable | URL (stored in R2) |
| `createdAt` | `timestamptz` | auto |  |
| `updatedAt` | `timestamptz` | auto |  |

#### `boards`

| Column         | Type          | Constraints   | Notes                     |
| -------------- | ------------- | ------------- | ------------------------- |
| `id`           | `uuid`        | PK, generated |                           |
| `title`        | `varchar`     | not null      |                           |
| `coverUrl`     | `varchar`     | nullable      | Background image URL      |
| `coverBgColor` | `varchar`     | not null      | Fallback background color |
| `createdAt`    | `timestamptz` | auto          |                           |
| `updatedAt`    | `timestamptz` | auto          |                           |

#### `board-members`

| Column | Type | Constraints | Notes |
| --- | --- | --- | --- |
| `id` | `uuid` | PK, generated |  |
| `role` | `enum` | not null, default `member` | `owner` / `admin` / `member` |
| `userId` | `uuid` | FK → users | CASCADE DELETE |
| `boardId` | `uuid` | FK → boards | CASCADE DELETE |
| `createdAt` | `timestamptz` | auto |  |
| `updatedAt` | `timestamptz` | auto |  |

Unique constraint on `(boardId, userId)`.

#### `columns`

| Column      | Type          | Constraints   | Notes               |
| ----------- | ------------- | ------------- | ------------------- |
| `id`        | `uuid`        | PK, generated |                     |
| `boardId`   | `uuid`        | FK → boards   | CASCADE DELETE      |
| `title`     | `varchar`     | not null      |                     |
| `order`     | `int`         | not null      | Display order       |
| `color`     | `varchar`     | nullable      | Column accent color |
| `createdAt` | `timestamptz` | auto          |                     |
| `updatedAt` | `timestamptz` | auto          |                     |

#### `tasks`

| Column | Type | Constraints | Notes |
| --- | --- | --- | --- |
| `id` | `uuid` | PK, generated |  |
| `order` | `decimal(20,15)` | default `0` | Fractional ordering — enables O(1) insertions |
| `isCompleted` | `boolean` | not null |  |
| `title` | `varchar` | not null |  |
| `descriptionContent` | `jsonb` | nullable | Tiptap / ProseMirror document JSON |
| `descriptionSearch` | `text` | nullable | Plain-text extract for future full-text search |
| `columnId` | `uuid` | FK → columns | CASCADE DELETE |
| `authorId` | `uuid` | FK → users |  |
| `dueDate` | `timestamptz` | nullable |  |
| `createdAt` | `timestamptz` | auto |  |
| `updatedAt` | `timestamptz` | auto |  |

#### `tasks_attachments`

| Column      | Type          | Constraints   | Notes              |
| ----------- | ------------- | ------------- | ------------------ |
| `id`        | `uuid`        | PK, generated |                    |
| `taskId`    | `uuid`        | FK → tasks    | CASCADE DELETE     |
| `url`       | `varchar`     | not null      | R2 public URL      |
| `fileName`  | `varchar`     | not null      | Original file name |
| `createdAt` | `timestamptz` | auto          |                    |
| `updatedAt` | `timestamptz` | auto          |                    |

#### `labels`

| Column      | Type          | Constraints   | Notes               |
| ----------- | ------------- | ------------- | ------------------- |
| `id`        | `uuid`        | PK, generated |                     |
| `title`     | `varchar`     | nullable      | Optional label text |
| `color`     | `varchar`     | not null      | Hex or named color  |
| `boardId`   | `uuid`        | FK → boards   | CASCADE DELETE      |
| `createdAt` | `timestamptz` | auto          |                     |
| `updatedAt` | `timestamptz` | auto          |                     |

#### Join Tables

| Table | Columns | Purpose |
| --- | --- | --- |
| `task_labels` | `taskId`, `labelId` | Task ↔ Label (M:N) |
| `assigned_members_to_task` | `taskId`, `userId` | Task ↔ User assignments (M:N) |

### Migrations

26 migration files reside in `server/src/db/migrations/`. They are run **automatically on application startup** via `migrationsRun: true` in the TypeORM data source configuration. This means you never need to run `migration:run` manually in a fresh environment — the database schema is always up to date after the server starts.

---

## 6. Environment Variables

Create a `.env` file in the repository root (shared by Docker Compose). All variables are validated at startup via a Joi schema in `server/src/config/app.config.ts` — the server will refuse to start if required variables are missing or malformed.

### Server Variables

| Variable | Type | Required | Example | Description |
| --- | --- | --- | --- | --- |
| `DB_HOST` | string | ✅ | `localhost` | PostgreSQL hostname |
| `DB_PORT` | number | ✅ | `5432` | PostgreSQL port |
| `DB_USERNAME` | string | ✅ | `postgres` | Database user |
| `DB_PASSWORD` | string | ✅ | `secret` | Database password |
| `DB_DATABASE` | string | ✅ | `flowra_kanban` | Database name |
| `JWT_ACCESS_SECRET` | string | ✅ | `change_me_access` | Access token signing secret |
| `JWT_ACCESS_EXPIRES_IN` | string | ✅ | `60m` | Access token TTL (e.g. `15m`, `1h`) |
| `JWT_REFRESH_SECRET` | string | ✅ | `change_me_refresh` | Refresh token signing secret |
| `JWT_REFRESH_EXPIRES_IN` | string | ✅ | `7d` | Refresh token TTL (e.g. `7d`, `30d`) |
| `SERVER_PORT` | number | ❌ | `8080` | Server listen port (default `8080`) |
| `R2_ACCOUNT_ID` | string | ✅\* | `abc123` | Cloudflare account ID |
| `R2_ACCESS_KEY_ID` | string | ✅\* | `key_id` | R2 access key |
| `R2_SECRET_ACCESS_KEY` | string | ✅\* | `secret_key` | R2 secret key |
| `R2_BUCKET_NAME` | string | ✅\* | `flowra-uploads` | R2 bucket name |
| `R2_PUBLIC_URL` | string | ✅\* | `https://pub.r2.dev/flowra-uploads` | Public base URL for uploaded files |
| `NODE_ENV` | string | ❌ | `development` | Runtime environment |

> \* Required only if using file upload functionality.

### Frontend Variables

| Variable | Type | Required | Example | Description |
| --- | --- | --- | --- | --- |
| `VITE_API_URL` | string | ✅ | `http://localhost:8080` | Backend base URL (injected at build time by Vite) |

> **Note:** Vite variables must be prefixed with `VITE_` to be exposed to client-side code.

---

## 7. Installation & Local Setup

### Prerequisites

| Tool           | Minimum Version | Notes                                   |
| -------------- | --------------- | --------------------------------------- |
| Node.js        | 20 LTS          | Required for both client and server     |
| pnpm           | 9+              | `npm install -g pnpm`                   |
| Docker Desktop | Latest          | Only needed for the Docker Compose path |
| PostgreSQL     | 15+             | Only needed for the manual setup path   |

---

### Option A — Docker Compose (recommended)

The fastest way to get a fully working environment with no manual database setup.

```bash
git clone https://github.com/your-org/flowra-kanban.git
cd flowra-kanban
```

Copy and fill in the environment variables:

```bash
cp .env.example .env
# edit .env with your preferred editor
```

Start all three services (PostgreSQL, NestJS backend, React frontend):

```bash
docker compose up --build
```

Services will be available at:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8080`
- PostgreSQL: `localhost:5432` (internal to Docker network as `db`)

The backend runs database migrations automatically on startup — no manual migration step required.

---

### Option B — Manual Setup

#### 1. Clone and install dependencies

```bash
git clone https://github.com/your-org/flowra-kanban.git
cd flowra-kanban
pnpm install
```

#### 2. Prepare the environment

```bash
cp .env.example .env
# Fill in DB_*, JWT_*, R2_*, and VITE_API_URL
```

#### 3. Create the PostgreSQL database

```bash
psql -U postgres -c "CREATE DATABASE flowra_kanban;"
```

#### 4. Start the backend (dev mode with watch)

```bash
pnpm dev:server
```

The server starts on `http://localhost:8080` and automatically runs all pending migrations on startup.

#### 5. Start the frontend (dev mode with HMR)

```bash
pnpm dev:client
```

The Vite dev server starts on `http://localhost:5173`.

#### 6. (Optional) Start both concurrently

```bash
pnpm dev
```

---

## 8. Commands & Scripts

### Root (monorepo)

| Command             | Description                                        |
| ------------------- | -------------------------------------------------- |
| `pnpm dev`          | Start client and server concurrently in watch mode |
| `pnpm dev:client`   | Start Vite dev server only                         |
| `pnpm dev:server`   | Start NestJS in watch mode only                    |
| `pnpm build`        | Build both client and server for production        |
| `pnpm build:client` | Build Vite frontend (`dist/`)                      |
| `pnpm build:server` | Build NestJS backend (`dist/`)                     |
| `pnpm lint`         | Lint both workspaces                               |
| `pnpm lint:client`  | ESLint client workspace                            |
| `pnpm lint:server`  | ESLint server workspace                            |

### Server (`server/`)

| Command | Description |
| --- | --- |
| `pnpm start` | Start compiled server (`nest start`) |
| `pnpm start:dev` | Start with file watcher (`nest start --watch`) |
| `pnpm start:debug` | Start with debugger attached |
| `pnpm start:prod` | Start from compiled output (`node dist/main`) |
| `pnpm build` | Compile TypeScript via NestJS CLI |
| `pnpm lint` | ESLint with auto-fix |
| `pnpm format` | Prettier format |
| `pnpm test` | Run unit tests (Jest) |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm test:cov` | Run tests with coverage report |
| `pnpm test:e2e` | Run end-to-end tests |
| `pnpm migration:generate -- --name=MigrationName` | Generate a new migration from entity diff |
| `pnpm migration:run` | Apply pending migrations manually |
| `pnpm migration:revert` | Revert the most recent migration |

---

## 9. API Reference

All endpoints are prefixed with the backend base URL (default `http://localhost:8080`).

Authentication uses `Authorization: Bearer <access_token>` headers. Guarded routes require a valid JWT; board-scoped routes additionally require the caller to be a member of the board.

### Authentication

| Method | Path | Auth | Body | Description |
| --- | --- | --- | --- | --- |
| `POST` | `/auth/register` | None | `{ email, password }` | Register a new user account |
| `POST` | `/auth/login` | None | `{ email, password }` | Authenticate and receive token pair |
| `POST` | `/auth/refresh` | Refresh token | — | Exchange refresh token for new access token |

### Users

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| `GET` | `/users/me` | JWT | Get the currently authenticated user's profile |
| `GET` | `/users` | JWT | List all users (supports query filter for search) |
| `PATCH` | `/users/:userId/complete-profile` | JWT | Set username and avatar after registration |

### Boards

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/boards` | JWT | Create a new board |
| `GET` | `/boards` | JWT | List all boards the current user is a member of |
| `GET` | `/boards/:boardId` | JWT + Member | Get a single board |
| `PATCH` | `/boards/:boardId` | JWT + Member | Update board title / cover |
| `DELETE` | `/boards/:boardId` | JWT + Member | Delete board and all its data (204) |

### Board Members

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| `GET` | `/boards/:boardId/members` | JWT + Member | List all members of a board |
| `POST` | `/boards/:boardId/members/add` | JWT + Admin/Owner | Add a user to the board |
| `DELETE` | `/boards/:boardId/members/:memberId/remove` | JWT | Remove a member (self or by admin) |

### Board Labels

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| `GET` | `/boards/:boardId/labels` | JWT + Member | List all labels for a board |
| `PATCH` | `/boards/:boardId/tasks/:taskId/labels/:labelId` | JWT + Member | Update label properties |
| `DELETE` | `/boards/:boardId/labels/:labelId` | JWT + Member | Delete a label (204) |

### Columns

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/boards/:boardId/columns` | JWT + Member | Create a new column |
| `GET` | `/boards/:boardId/columns` | JWT + Member | List all columns for a board |
| `PATCH` | `/boards/:boardId/columns/:columnId` | JWT + Member | Rename or recolor a column |
| `DELETE` | `/boards/:boardId/columns/:columnId` | JWT + Member | Delete a column (204) |
| `PATCH` | `/boards/:boardId/columns/reorder` | JWT + Member | Persist new column order (204) |

### Tasks

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/boards/:boardId/columns/:columnId/tasks` | JWT + Member | Create a new task |
| `GET` | `/boards/:boardId/tasks` | JWT + Member | List all tasks for a board |
| `GET` | `/boards/:boardId/tasks/:taskId` | JWT + Member | Get task details |
| `PATCH` | `/boards/:boardId/tasks/:taskId` | JWT + Member | Update task fields |
| `DELETE` | `/boards/:boardId/tasks/:taskId` | JWT + Member | Delete a task (204) |
| `PATCH` | `/boards/:boardId/tasks/:taskId/reorder` | JWT + Member | Move/reorder a task (204) |

### Task Labels

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/boards/:boardId/tasks/:taskId/labels` | JWT + Member | Create a new label and assign it to the task |
| `GET` | `/boards/:boardId/tasks/:taskId/labels/assigned` | JWT + Member | Get labels assigned to a task |
| `POST` | `/boards/:boardId/tasks/:taskId/labels/assign` | JWT + Member | Assign existing labels to a task |

### Task Members

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| `GET` | `/boards/:boardId/tasks/:taskId/members/assigned` | JWT + Member | Get members assigned to a task |
| `POST` | `/boards/:boardId/tasks/:taskId/members/assign` | JWT + Member | Assign board members to a task |

### Task Attachments

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/boards/:boardId/tasks/:taskId/attachments/save` | JWT + Member | Save attachment URL(s) after direct R2 upload |
| `GET` | `/boards/:boardId/tasks/:taskId/attachments` | JWT + Member | List attachments for a task |
| `DELETE` | `/boards/:boardId/tasks/:taskId/attachments` | JWT + Member | Remove an attachment by URL (204) |

### Storage

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/upload-url` | JWT | Get a presigned S3 PUT URL for direct-to-R2 upload |

---

## 10. Integrations & External Services

### Cloudflare R2 (Object Storage)

Files are stored in Cloudflare R2, an S3-compatible object storage service. The integration uses the official AWS SDK v3 (`@aws-sdk/client-s3` + `@aws-sdk/s3-request-presigner`) configured with a Cloudflare-specific endpoint (`https://<accountId>.r2.cloudflarestorage.com`).

**Upload flow:**

1. Client requests a presigned URL: `POST /upload-url` with `{ folder, fileName, fileType }`
2. Server generates a `PutObjectCommand` presigned URL (expires in 60 seconds) and a public URL using `R2_PUBLIC_URL`
3. Client PUTs the file binary directly to R2 — the server never proxies file bytes
4. Client stores the resulting public URL via `POST /boards/:boardId/tasks/:taskId/attachments/save`

**File naming:** `{folder}/{uuid}-{originalFileName}` — guarantees uniqueness and preserves the original file name.

### JWT Authentication

Tokens are signed using `@nestjs/jwt` with HS256. Two separate secrets (`JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`) ensure that a leaked refresh secret cannot be used to forge access tokens and vice versa.

### PostgreSQL (via TypeORM)

TypeORM is configured in `synchronize: false` mode — the schema is managed exclusively through migrations. The `migrationsRun: true` flag means migrations are applied automatically on server startup, making deployment and local setup simpler.

---

## 11. Security & Performance

### Security Measures

| Measure | Implementation |
| --- | --- |
| **CORS** | Restricted to `http://localhost:5173` (dev) and `https://flowra-kanban-client.vercel.app` (prod) in `main.ts` |
| **Password hashing** | bcrypt with default salt rounds (`bcrypt.hash`) — plaintext passwords are never stored |
| **JWT token rotation** | Short-lived access tokens + long-lived refresh tokens; separate signing secrets |
| **DTO whitelist** | `ValidationPipe` with `whitelist: true` strips any properties not declared in the DTO class — prevents mass-assignment attacks |
| **Response serialization** | `ClassSerializerInterceptor` with `strategy: 'excludeAll'` — only `@Expose()` fields are returned; prevents accidental exposure of sensitive fields like password hashes |
| **Board access guard** | `BoardAccessGuard` checks that the requesting user is a member of the target board on every board-scoped route |
| **Role-based authorization** | `BoardRoleGuard` with `@Roles(BoardRole.ADMIN, BoardRole.OWNER)` restricts sensitive operations (e.g. adding members) |
| **Presigned URL expiry** | R2 presigned upload URLs expire after 60 seconds — minimizes the window for unauthorized uploads |
| **Input validation** | `class-validator` decorators on all DTOs validate types, lengths, formats, and required fields |

### Performance Considerations

| Area | Approach |
| --- | --- |
| **Fractional task ordering** | Tasks use `decimal(20,15)` order values — a new position between two tasks is the midpoint of their order values, avoiding full-table reorders |
| **JSONB for rich text** | Task description is stored as JSONB, allowing PostgreSQL to index into the document structure in the future |
| **Separate search text column** | `descriptionSearch` (plain text extract) is stored separately for efficient `LIKE` or full-text search without parsing JSONB at query time |
| **Direct-to-R2 uploads** | Files bypass the backend entirely, reducing server memory and bandwidth load |
| **TanStack Query caching** | All server state is cached by TanStack Query; mutations trigger targeted cache invalidations rather than full refetches |
| **Optimistic UI** | Drag-and-drop operations update Zustand local state immediately; server requests happen asynchronously |
| **Docker multi-stage builds** | Production Docker images use multi-stage builds to minimize final image size |

---

## 12. Testing & Deployment

### Testing

The server workspace is configured for Jest with TypeScript support via `ts-jest`.

```bash
# Run all unit tests
cd server && pnpm test

# Run tests with coverage report
cd server && pnpm test:cov

# Run end-to-end tests
cd server && pnpm test:e2e
```

### Production Build

```bash
# Build both workspaces
pnpm build

# Client output: client/dist/
# Server output: server/dist/
```

### Deployment Options

#### Docker Compose (VPS / Self-hosted)

The included `docker-compose.yml` is production-ready. Ensure your `.env` is configured with production values, then:

```bash
docker compose up -d --build
```

Recommended additional steps for production:

- Place an Nginx reverse proxy in front of the backend on port 80/443
- Enable SSL/TLS (Let's Encrypt via Certbot or Nginx Proxy Manager)
- Set `NODE_ENV=production`
- Use strong, randomly generated JWT secrets

#### Frontend — Vercel

The `client/vercel.json` configures Vercel for SPA deployment with the necessary rewrite rule (`/* → /index.html`). Deploy by connecting your GitHub repository to Vercel and setting the `VITE_API_URL` environment variable in the Vercel project settings.

```bash
# Manual deploy via Vercel CLI
cd client
npx vercel --prod
```

#### Backend — Any Node.js Host (Railway, Render, Fly.io, etc.)

```bash
# Build
cd server && pnpm build

# Start production server
pnpm start:prod
# or
node dist/main.js
```

Set all required environment variables in your hosting provider's dashboard. The server will run migrations automatically on startup.

---

## License

This project is private. All rights reserved.
