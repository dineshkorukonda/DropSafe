# web-app

Next.js application for the DropSafe web experience and backend APIs.

## Getting Started

1. Install dependencies.
2. Copy `.env.example` to `.env.local`.
3. Set `DATABASE_URL` to your Neon connection string.
4. Run the development server.

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Auth routes

- `/auth/signup`
- `/auth/login`
- `/dashboard`

The auth backend uses:

- Neon Postgres via `@neondatabase/serverless`
- `bcryptjs` for password hashing
- `nodemailer` for verification and reset emails
- HTTP-only cookie sessions stored in a `sessions` table

The auth layer now also creates:

- `email_verification_tokens`
- `password_reset_tokens`
- `onboarding_profiles`

These tables are created automatically on first auth request.

## Neon setup

Create a Neon project, then use its pooled connection string in `DATABASE_URL`, for example:

```env
DATABASE_URL=postgresql://user:password@ep-example.ap-southeast-1.aws.neon.tech/dropsafe?sslmode=require
APP_URL=http://localhost:3000
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_USER=resend
SMTP_PASS=your_smtp_password
SMTP_FROM=DropSafe <no-reply@dropsafe.app>
```

If SMTP is not configured, verification and reset links are logged to the server console as a development fallback.
