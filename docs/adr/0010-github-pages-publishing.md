# 0010 GitHub Pages Publishing Strategy

## Status

Accepted

## Context

The live URL is a first-class deliverable and must work early.

## Decision

Publish from the `main` branch `/docs` folder. Vite builds directly to `docs/` with base path `/open-school-lab/`. `make build` removes generated Pages files while preserving authored docs, then copies `docs/index.html` to `docs/404.html`.

## Consequences

Generated Pages assets are committed. `.gitignore` excludes `dist/` but not `docs/`.

## Alternatives Considered

A `gh-pages` branch was rejected because it adds branch management overhead.
