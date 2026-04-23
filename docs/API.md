# API Overview

Base URL: `/api`

## Auth
- `POST /auth/register`
- `POST /auth/login`

## Operations
- `GET/POST /emails`
- `GET/POST /deals`
- `GET/POST /songs`
- `GET/POST /tasks`
- `GET/POST /finance`
- `POST /uploads`

## Team Calendar
- `GET/POST /events` (collaborative calendar for all members)

## Newsletter Management
- `GET/POST /subscribers` (manager/admin)
- `PATCH /subscribers/:id/deactivate` (manager/admin)
- `GET /newsletters` (manager/admin)
- `POST /newsletters/publish` (manager/admin)

`POST /newsletters/publish` will send the newsletter to active `sub` and/or `vip` subscribers automatically using configured SMTP credentials.

All operational routes (except auth) require `Authorization: Bearer <token>`.
