# 0017 Dependency Policy

## Status

Accepted

## Context

The app should use proven libraries and avoid custom infrastructure.

## Decision

Use Vite, React, TypeScript, TanStack Query, zod, lucide-react, Vitest, Testing Library, Playwright, ESLint, Prettier, and gitleaks. Heavy engines must be lazy and reviewed for payload, licensing, and browser compatibility before production integration.

## Consequences

The project stays maintainable and avoids hidden operational risk.

## Alternatives Considered

Hand-rolled build, test, or icon systems were rejected.
