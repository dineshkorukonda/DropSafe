# DropSafe

AI-powered micro-insurance platform for gig and delivery workers.

## Architecture

DropSafe is organized as a monorepo with three main applications and services:

```text
dropsafe/
├── docs/
├── web-app/
├── mobile-app/
└── llm-services/
```

### `web-app`

Next.js application that serves two roles:
- public-facing web product
- serverless backend for APIs used by the web client and mobile app

Core responsibilities:
- authentication
- policy purchase and renewal
- premium calculation
- claims intake and status tracking
- payout orchestration
- database access
- orchestration layer for LLM service calls

### `mobile-app`

Mobile client for workers to:
- onboard and sign in
- view policies
- buy coverage
- submit claims
- track payouts and claim status

### `llm-services`

Python-based AI services for:
- risk scoring
- premium multiplier suggestions
- fraud signal generation
- claim triage support

## System Flow

```text
Mobile App / Web Client
        ↓
web-app (Next.js + serverless APIs)
        ↓
PostgreSQL + llm-services
        ↓
Risk, pricing, claims, and payout responses
```

## Product Focus

DropSafe is designed for hackathon execution with a practical architecture:
- a single web layer handling frontend and backend concerns
- a separate mobile client for worker journeys
- isolated LLM services for experimentation and iteration

## Repository Notes

- The current implemented app lives in [`/web-app`](/Users/dinexh/Developer/DropSafe/web-app).
- The mobile starter now lives in [`/mobile-app`](/Users/dinexh/Developer/DropSafe/mobile-app).
- Product docs live in [`/docs`](/Users/dinexh/Developer/DropSafe/docs).
- The product exploration is in [`/docs/product-exploration.md`](/Users/dinexh/Developer/DropSafe/docs/product-exploration.md).
- The updated technical specification is in [`/docs/technical-spec.md`](/Users/dinexh/Developer/DropSafe/docs/technical-spec.md).
