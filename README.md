# RN-US Platform

A full-stack business dashboard for a music group manager and team.

## Project Structure

- `rn-us-platform/` → React + Vite frontend
- `backend/` → Express + MongoDB API
- `database/` → SQL schema + seeds + migrations
- `docs/` → API, deployment and brand docs

## Quick Start

### 1) Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### 2) Frontend
```bash
cd rn-us-platform
npm install
npm run dev
```

### 3) Optional DB containers
```bash
docker-compose up -d
```

## Features Included

- Auth with role checks
- Email operations for fan/collab/legal workflows
- Song pipeline and publishing tracking
- Deal and revenue tracking
- Team task board
- Upload endpoint scaffolding
- Analytics summary endpoint
- Newsletter studio with automatic sends to Subscribers/VIPs
- Member-specific dashboards with shared collaborative event calendar

Built for scaling from creative workflow to real business operations.

## SMTP / Company Email Setup

For secure usage, put your real company mailbox credentials only in `backend/.env` (never commit secrets).

Example values are already wired for Proton SMTP host in `.env.example`.
