### 🗄️ Database Migrations (`server/`)

We use TypeORM for database management. All migration files are stored in `src/db/migrations`.

**1. Generate a new migration** Automatically generates a migration file based on your Entity changes. _Always include the full path and a descriptive name._

```bash
pnpm migration:generate src/db/migrations/NameOfMigration
```

**2. Run migrations** Applies all pending migrations to the database. _Always run this immediately after generating a new migration._

```bash
pnpm migration:run
```

**3. Revert migration** Rolls back the most recently applied migration.

```bash
pnpm migration:revert
```

.
