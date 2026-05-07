# 0008 Go Backend Layout

## Status

Accepted

## Context

The bootstrap requested Go backend layout only for Modes B and C.

## Decision

Skip Go backend layout in Mode A.

## Consequences

The repository remains frontend-only. Backend conventions can be introduced if the deployment mode changes.

## Alternatives Considered

Creating empty Go directories was rejected because it would imply a backend that does not exist.
