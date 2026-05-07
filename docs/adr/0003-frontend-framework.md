# 0003 Frontend Framework and Build Tooling

## Status

Accepted

## Context

The app needs a rich interactive frontend, TypeScript, fast local development, and GitHub Pages output.

## Decision

Use React, TypeScript strict mode, and Vite. Use Vitest for unit tests and Playwright for smoke tests.

## Consequences

The toolchain is common, production-proven, and easy for contributors to run locally.

## Alternatives Considered

Svelte and vanilla web components were considered, but React has the broadest ecosystem for education-focused UI and testing.
