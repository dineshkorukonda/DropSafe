# DropSafe Technical Specification

Version: 1.1
Project: DropSafe
Architecture: Monorepo

## Repository Structure

    dropsafe/
    │
    ├── web-app/
    ├── mobile-app/
    └── llm-services/

## 1. System Overview

DropSafe is an AI-assisted micro-insurance platform for gig workers, especially delivery partners exposed to weather and work disruption risk.

The platform provides:
- policy management
- dynamic premium calculation
- automated and assisted claim workflows
- AI risk scoring
- fraud detection support
- payout orchestration

The monorepo is organized so the web app serves both as the customer-facing web product and the serverless backend layer that communicates with the mobile app and the LLM services over APIs.

## 2. Web Application and Serverless Backend

Location: `/web-app`

Responsibilities:
- user authentication and session management
- policy purchase and renewal
- premium calculation
- claims intake and claim status management
- payout initiation and transaction tracking
- API layer for the mobile app
- orchestration layer for calls to LLM services
- admin and operations dashboards

### Tech Stack

- Next.js
- Next.js App Router / API Routes / Server Actions
- PostgreSQL
- Prisma ORM
- Auth.js or Clerk
- Stripe or equivalent payment provider
- Vercel

### Example API

`POST /api/policies/create`

Request:

```json
{
  "user_id": "123",
  "coverage": 50000,
  "platform": "Swiggy",
  "hours_per_week": 40,
  "city": "Bengaluru"
}
```

Response:

```json
{
  "policy_id": "pol_123",
  "premium": 149.0,
  "risk_score": 0.18,
  "premium_multiplier": 1.18,
  "status": "active"
}
```

## 3. Database

Primary database: PostgreSQL

Core tables:
- users
- policies
- claims
- risk_scores
- transactions
- payouts
- locations

### Example Prisma Schema

```ts
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  role      String
  createdAt DateTime @default(now())

  policies  Policy[]
  claims    Claim[]
}

model Policy {
  id         String   @id @default(uuid())
  userId     String
  coverage   Float
  premium    Float
  status     String
  startDate  DateTime
  endDate    DateTime
  createdAt  DateTime @default(now())

  user       User     @relation(fields: [userId], references: [id])
}

model Claim {
  id          String   @id @default(uuid())
  userId      String
  policyId    String
  status      String
  amount      Float
  reason      String
  createdAt   DateTime @default(now())
}
```

## 4. Mobile Application

Location: `/mobile-app`

Purpose:
- give workers a simple app experience for policy and claim actions
- consume APIs exposed by the web backend
- surface policy, risk, payout, and claim status in real time

Features:
- onboarding and login
- policy dashboard
- plan selection and policy purchase
- premium preview
- claim submission
- supporting image or document upload when needed
- claim tracking
- payout and transaction history
- notifications for weather risk, claim decisions, and payouts

### Tech Stack

- React Native
- Expo
- Zustand
- REST API

### Example API Client

```javascript
const API = "https://api.dropsafe.com";

export async function getPolicies(userId) {
  const res = await fetch(`${API}/api/policies/list?user=${userId}`);
  return res.json();
}
```

## 5. LLM Services

Location: `/llm-services`

Purpose:
- risk scoring
- fraud signal generation
- premium multiplier suggestions
- claim triage assistance
- structured summaries for internal review

### Tech Stack

- Python
- FastAPI
- OpenAI API
- Pandas
- Docker

### FastAPI Example

```python
from fastapi import FastAPI
from risk_model import evaluate_risk

app = FastAPI()

@app.post("/risk-score")
def risk_score(data: dict):
    result = evaluate_risk(data)
    return result
```

### Risk Model Example

```python
def evaluate_risk(data):
    score = 0

    if data["hours_per_week"] > 50:
        score += 0.2

    if data["accident_history"] > 0:
        score += 0.3

    if data["vehicle_age"] > 5:
        score += 0.1

    return {
        "risk_score": score,
        "premium_multiplier": 1 + score
    }
```

## 6. Architecture Flow

    Mobile App
       ↓
    Web App / Serverless Backend
       ↓
    LLM Services
       ↓
    Risk / Fraud / Pricing Result
       ↓
    Web App Response to Mobile App or Web Client

## 7. Development Setup

Run web:

    cd web-app
    npm install
    npm run dev

Run mobile:

    cd mobile-app
    npm install
    expo start

Run LLM services:

    cd llm-services
    pip install -r requirements.txt
    uvicorn main:app --reload

## 8. Deployment

    Users
      ↓
    Web App (Vercel)
      ↓
    Serverless API Layer
      ↓
    PostgreSQL
      ↓
    LLM Services (Docker / container deployment)

The mobile app communicates with the deployed serverless backend and does not access the database or LLM services directly.

## 9. Security

- HTTPS everywhere
- JWT or session-based authentication
- role-based access control for admin APIs
- request validation on all API routes
- rate limiting
- encrypted storage for sensitive records
- audit trails for policy, claim, and payout actions
- fraud detection signals from LLM services

## 10. Summary

Monorepo structure:

    web-app       → website + serverless backend
    mobile-app    → mobile client for workers
    llm-services  → AI and LLM-powered risk and fraud services
