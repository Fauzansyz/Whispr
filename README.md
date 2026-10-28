<div align="center">

# Whispr

### A little curiosity goes a long way.

Create a personal link, share it with your friends, and let them send you anonymous messages—no account required to write.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149eca?logo=react)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169e1?logo=postgresql)](https://neon.tech/)

</div>

---

## What is Whispr?

Whispr is an anonymous Q&A and messaging app. Each account gets a public profile link that can be shared in a bio, chat, or social story. Visitors can send a message without signing up; the profile owner signs in to manage messages in a private inbox.

## Features

- **Personal message links** — choose a username and share your public profile.
- **Anonymous submissions** — visitors can send a message and add a short prompt without creating an account.
- **Inbox controls** — browse all, unread, starred, and spam messages; mark messages read or unread, star them, flag spam, or delete them.
- **Profile settings** — edit your display name, username, and bio, and pause or resume incoming messages.
- **Story-ready images** — download share cards for your profile and images of messages to post as replies.
- **Account sign-in** — create an account or log in with email and password; Google sign-in is available when configured.
- **Abuse prevention** — submissions are limited to 1,000 characters and five messages per detected IP in a 10-minute window.

> **Privacy note:** Sender identities are not shown in the recipient's inbox. To rate-limit submissions, Whispr stores a keyed hash of a detected sender IP address; this is not the sender's account or public identity. As with any web app, hosting providers and network infrastructure may process connection data.

## Getting started

### Requirements

- Node.js 20.9 or later
- npm
- A PostgreSQL database (for example, a Neon database)

### 1. Install dependencies

```bash
git clone https://github.com/Fauzansyz/Whispr.git
cd Whispr
npm ci
```

### 2. Configure environment variables

Create `.env.local` in the project root:

```dotenv
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
BETTER_AUTH_SECRET=replace-with-a-long-random-secret
BETTER_AUTH_URL=http://localhost:3000

# Optional: enable Google sign-in
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

`DATABASE_URL` should point to your PostgreSQL database. For a local development secret, generate a value with `openssl rand -base64 32`. Keep credentials private and never commit `.env.local`.

### 3. Prepare the database

Apply the Drizzle schema to your database:

```bash
npx drizzle-kit push
```

Run this again after changing the database schema during development.

### 4. Start Whispr

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Create an account, choose a profile username, and share the resulting `/<username>` link.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |

Before running `npm start`, build the app with `npm run build`.

## Application routes

| Route | Purpose |
| --- | --- |
| `/` | Product landing page |
| `/register` | Create an account |
| `/login` | Sign in |
| `/dashboard` | Private inbox and share-link dashboard |
| `/profile` | Edit profile settings and message availability |
| `/<username>` | Public profile and anonymous message form |

## API overview

| Endpoint | Methods | Purpose |
| --- | --- | --- |
| `/api/auth/[...all]` | Better Auth routes | Account and session management |
| `/api/profiles/[username]` | `GET` | Fetch a public profile |
| `/api/messages` | `GET`, `POST` | Load the signed-in user's inbox or submit an anonymous message |
| `/api/messages/[id]` | `PATCH`, `DELETE` | Update message status or delete a message |

## Built with

- [Next.js](https://nextjs.org/) App Router and [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Better Auth](https://www.better-auth.com/) for authentication
- [Drizzle ORM](https://orm.drizzle.team/) and [Neon](https://neon.tech/) serverless PostgreSQL
- [Lucide](https://lucide.dev/) icons and [html-to-image](https://github.com/bubkoo/html-to-image) for downloadable share cards

## Deployment

Deploy as a Node.js Next.js application. Configure `DATABASE_URL`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL` in the hosting provider's environment settings, then apply the Drizzle schema to the production database. Set `BETTER_AUTH_URL` to the deployed site's canonical HTTPS origin. Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` only if Google sign-in is enabled, and configure the corresponding OAuth credentials for your deployment.

---

<div align="center">

Made for the messages you almost didn't send.

</div>
