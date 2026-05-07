# 0009 Configuration and Secrets

## Status

Accepted

## Context

Static frontend apps must not hold secrets.

## Decision

No secrets are required. Build-time configuration is limited to `PAGES_BASE`. `.env.example` documents the placeholder, and git hooks run gitleaks.

## Consequences

The app can be served publicly without secret management.

## Alternatives Considered

User-supplied keys were rejected because v1 uses no authenticated APIs.
