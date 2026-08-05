# Dagobah Digital Garden

This is a [Next.js](https://nextjs.org) application with [Payload CMS](https://payloadcms.com) and a local SQLite database.

## Getting started

Create your local environment file and set a secure secret:

```bash
cp .env.example .env.local
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000/admin](http://localhost:3000/admin) and create the first administrator account. Posts are available through the Admin Panel and the REST API at `/api/posts`.

The database defaults to `payload.db` in the project root and is ignored by Git. Set `DATABASE_URL` to a remote libSQL-compatible database URL before deploying.

When changing Payload collections or Admin components, refresh generated artifacts:

```bash
npm run generate:types
npm run generate:importmap
```

## Scripts

- `npm run dev` — start Next.js and Payload locally
- `npm run build` — create a production build
- `npm run payload -- <command>` — run a Payload CLI command
- `npm run generate:types` — update generated Payload TypeScript types
- `npm run generate:importmap` — update the Admin Panel component import map
