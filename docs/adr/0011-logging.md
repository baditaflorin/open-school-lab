# 0011 Logging Strategy

## Status

Accepted

## Context

Mode A has no server logs.

## Decision

Avoid production console logging. User-visible status appears in the UI.

## Consequences

There are no centralized logs. Debugging happens locally through browser developer tools.

## Alternatives Considered

Remote logging was rejected for privacy and operational simplicity.
