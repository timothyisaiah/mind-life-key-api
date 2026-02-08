# Mind Life Key API

Production-ready NestJS 10 REST API using Postgres (Neon) + Prisma.

## Folder Structure

```
prisma/
  migrations/
  schema.prisma
  seed.ts
src/
  auth/
  budgets/
  categories/
  goals/
  recurring-transactions/
  transactions/
  achievements/
  notifications/
  exchange-rates/
  settings/
  sync/
  prisma/
  common/
  app.module.ts
  main.ts
```

## Setup

1. Copy `.env.example` to `.env` and set `DATABASE_URL` and `JWT_SECRET`.
2. Install dependencies:
   ```
   npm install
   ```
3. Apply migrations + seed categories:
   ```
   npm run prisma:migrate
   npm run prisma:seed
   ```
4. Start dev server:
   ```
   npm run start:dev
   ```

Swagger docs: `http://localhost:3000/docs`

## Tests

Run unit tests:
```
npm test
```

Watch mode:
```
npm run test:watch
```

## Prisma

Generate client:
```
npm run prisma:generate
```

## Auth

Register:
```
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "Str0ngPass!"
}
```

Login:
```
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "Str0ngPass!"
}
```

Use `Authorization: Bearer <token>` on all protected routes.

## Google OAuth

Set these in `.env` (or `.env.demo`):
```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
```

Start login:
```
GET /api/auth/google
```

Callback (returns JWT):
```
GET /api/auth/google/callback
```

## Example Requests

Create transaction:
```
POST /api/transactions
{
  "description": "Lunch",
  "amount": "12.50",
  "categoryId": 1,
  "date": "2026-01-31",
  "type": "expense",
  "currency": "UGX"
}
```

List transactions with filters:
```
GET /api/transactions?startDate=2026-01-01&endDate=2026-01-31&type=expense&categoryId=1&page=1&limit=20
```

Update user settings:
```
PUT /api/settings/user
{
  "currency": "UGX",
  "startingBalance": "0.00",
  "currentBalance": "1200.00"
}
```

Update exchange rates:
```
PUT /api/exchange-rates
{
  "rates": {
    "UGX": { "symbol": "USh", "rate": 1 },
    "USD": { "symbol": "$", "rate": 0.00027 }
  },
  "lastExchangeRateUpdate": "2026-01-31T00:00:00.000Z"
}
```

Sync all data:
```
POST /api/sync
{
  "transactions": [],
  "budgets": [],
  "goals": [],
  "recurringTransactions": [],
  "achievements": [],
  "notifications": []
}
```

## Notes

- Amounts are handled as strings in DTOs and stored as Prisma `Decimal`.
- Categories are seeded and read-only.
