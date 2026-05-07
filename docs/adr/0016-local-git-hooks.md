# 0016 Local Git Hooks

## Status

Accepted

## Context

The bootstrap forbids GitHub Actions and requires local checks.

## Decision

Use `.githooks/` wired by `make install-hooks`. Hooks run lint, format checks, TypeScript, gitleaks, tests, build, and smoke checks.

## Consequences

Contributors must install hooks locally. The commands are also runnable through Make targets.

## Alternatives Considered

Lefthook was considered, but plain hooks avoid another dependency.
