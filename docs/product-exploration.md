# DropSafe Product Exploration

## Title

DropSafe

## One-Line Description

An AI-powered micro-insurance platform that protects gig and delivery workers from income disruption, operational risk, and claim uncertainty.

## What The App Is

DropSafe is a hackathon-ready insurance platform built for gig workers, especially delivery partners. It combines a web platform, a mobile app, and AI services in a single monorepo. The goal is to make policy purchase, risk assessment, claim handling, and payouts faster and more accessible than traditional insurance systems.

## Main Features

- User authentication and onboarding
- Policy browsing, purchase, and renewal
- Dynamic premium calculation
- Policy dashboard
- Claim submission
- Claim status tracking
- Payout initiation and transaction history
- Mobile-to-backend API integration
- AI risk scoring
- Fraud detection support
- Admin or operations visibility
- Notifications for risk, claims, and payouts

## Unique Features

- Built specifically for gig and delivery workers rather than generic retail insurance customers
- Monorepo architecture with clear separation between web, mobile, and AI services
- `web-app` acts as both frontend and serverless backend, which is efficient for hackathon delivery
- LLM services are isolated so risk and fraud workflows can evolve independently
- AI-assisted pricing through risk scoring and premium multipliers
- AI-supported claim triage and fraud signal generation
- Mobile app interacts only with the backend layer, keeping the architecture cleaner and safer
- Supports both manual user flows and automated backend decisioning

## Why The Architecture Fits The Hackathon

- Faster development with one repository
- Easier deployment and demo setup
- Clear service boundaries without overengineering
- Flexible enough to ship an MVP and still add stretch features

## Suggested Positioning

DropSafe can be positioned as:
- AI-assisted micro-insurance for delivery partners
- a risk intelligence layer for gig-worker protection
- a modern, API-first insurance experience for mobile-first workers
