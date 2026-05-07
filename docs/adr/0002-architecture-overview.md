# 0002 Architecture Overview and Module Boundaries

## Status

Accepted

## Context

The application needs many lab tools without becoming twelve unrelated apps.

## Decision

Use a registry-driven frontend. `features/labs/labRegistry.tsx` defines lesson metadata and controls. `features/labs/labs.tsx` renders the shared workbench. `features/labs/simulation.ts` owns deterministic browser-side model calculations.

## Consequences

Adding a tool is mostly data plus optional specialized simulation logic. Shared UI behavior stays consistent for teachers and students.

## Alternatives Considered

Separate routes per tool were deferred until tools need deeply custom workflows.
