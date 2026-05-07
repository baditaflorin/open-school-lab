# 0004 Static Data Contract

## Status

Accepted

## Context

Mode A v1 does not need external datasets.

## Decision

No committed static data contract is required in v1. Lab definitions are TypeScript data compiled into the app. Exported runs use a stable JSON shape with `lab`, `values`, `output`, and `exportedAt`.

## Consequences

There is no data freshness concern. Future lesson packs can introduce `/data/v1/*.json`.

## Alternatives Considered

Mode B data artifacts were rejected until teacher-authored lesson packs or large reference datasets exist.
