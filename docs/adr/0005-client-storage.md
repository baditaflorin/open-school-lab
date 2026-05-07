# 0005 Client-Side Storage

## Status

Accepted

## Context

The app should remember small user preferences and remain offline-friendly.

## Decision

Use localStorage for v1's last selected lab. Use downloaded JSON files for run exports. Reserve IndexedDB or OPFS for future large artifacts and notebook-like work.

## Consequences

Storage is simple and transparent. It is not cross-device synced.

## Alternatives Considered

IndexedDB was considered but is unnecessary for the current state size.
