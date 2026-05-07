# 0001 Deployment Mode

## Status

Accepted

## Context

The project must make virtual lab equipment available to schools with minimal operations burden. The v1 feature set is simulation and visualization in the browser. There is no requirement for shared accounts, server-side secrets, writes, or realtime collaboration.

## Decision

Use Mode A: Pure GitHub Pages. The app is fully client-side and uses static assets, lazy browser adapters, browser storage, and browser APIs.

## Consequences

The public surface is static and cheap to host. Advanced WASM modules that require cross-origin isolation need a compatibility layer, fallback, or future hosting reconsideration.

## Alternatives Considered

Mode B was unnecessary because v1 has no scheduled data artifacts. Mode C was rejected because a runtime backend would add operations and security burden without a v1 requirement.
