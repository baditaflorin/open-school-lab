# 0014 Error Handling Conventions

## Status

Accepted

## Context

Browser-only tools need clear feedback when a runtime or export action is unavailable.

## Decision

Use user-visible status messages and local fallbacks. Avoid throwing from UI event handlers when a feature can degrade gracefully.

## Consequences

Lessons remain usable when a browser lacks WebGPU or blocks service workers.

## Alternatives Considered

Fail-fast behavior was rejected for classroom use.
