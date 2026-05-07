# 0006 WASM Modules

## Status

Accepted

## Context

The project names engines that can be delivered through JavaScript, WASM, or browser wrappers. Some require large payloads or cross-origin isolation.

## Decision

Define lazy engine boundaries per lab and keep the initial app shell below the asset budget. V1 ships deterministic browser-side adapters and capability probes, then loads heavier real engines behind user actions as they are integrated.

## Consequences

The app is usable on day one and remains fast. Full parity with upstream engines is incremental.

## Alternatives Considered

Bundling all WASM upfront was rejected due to payload size and GitHub Pages header constraints.
