# Express Typescript Boilerplate

A starter project for Express Typescript

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js: [Download and install Node.js](https://nodejs.org/)
- npm: Node package manager (comes with Node.js installation)
- pnpm: Install via npm

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/bandabahariputra/express-ts-boilerplate
   ```

2. Navigate to the project directory:

   ```bash
   cd express-ts-boilerplate
   ```

3. Install dependencies

   ```bash
   pnpm install
   ```

## Environment Variables

```yaml
# Port number
PORT=3000

# URL of the Database Connection
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/express_ts_boilerplate"

# JWT
JWT_SECRET="secret"
JWT_EXPIRATION="1h"
```

## Folder structure

```yaml
project-root/
💡 Documentations & diagrams on local development steps, deployment processes, etc
/docs

💡 If you prefer keeping testing files seperately
/__tests__

💡 Keep all your code files seperate from configuration files
/src

  💡 All your configuration such as logger, db connections, etc
  /application

  💡 REST API routes, keep them clean & short
  /routes

  💡 Responsible for receiving & returning data to routes
  /controllers

  💡 Core business logic
  /services

  💡 Database logic only (data-in/data-out, no business logic)
  /repositories

  💡 Optional, a place to define your DB schema if needed
  /models

  💡 Optional: Static values you might use across the project
  /constants

  💡 Wrappers for 3rd party SDKs/APIs, such as Stripe/Shopify APIs
  /libs

  💡 Parsing errors, protecting endpoints, caching, etc
  /middlewares

  💡 Optional: Type definitions if needed
  /types

  💡 Optional: Functions / classes for validating incoming API payloads
  /validations

  💡 Optional, only if you rely on generated types/functions
  /generated

  💡 Optional: Some teams call it 'utils' folder
  /common

  💡 Centralise your environment variables in one place
  env.ts

💡 Keep configuration files in root folder
package.json
.prettierrc
.prettierignore
.eslintrc.js
.eslintignore
pnpm-lock.yaml
```

## API Endpoints

List of available routes:

**Auth routes**:\
`POST /api/auth/register` - register\
`POST /api/auth/login` - login

**User routes**:\
`GET /api/users/current` - get current user\
`PATCH /api/users/update` - update current user\
`POST /api/users/change-password` - change password
