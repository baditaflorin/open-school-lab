# 0013 Testing Strategy

## Status

Accepted

## Context

The app needs fast local checks without GitHub Actions.

## Decision

Use Vitest for registry and simulation unit tests, Testing Library for React interaction tests, and Playwright for a smoke happy path. `make test`, `make build`, and `make smoke` are wired into local hooks.

## Consequences

Checks are runnable locally and fast enough for pre-push.

## Alternatives Considered

Browser-only manual testing was rejected.
