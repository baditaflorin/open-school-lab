# Postmortem

Built:

- A Mode A GitHub Pages React app.
- Twelve lesson-aligned lab UIs with deterministic browser-side simulations.
- Local tests, smoke tests, hooks, docs, ADRs, and Pages-ready output.

Mode hindsight:

Mode A remains the correct choice for v1. The project needs broad access, no secrets, no auth, and no shared writes. The only pressure against Mode A is that some upstream WASM engines require cross-origin isolation or large payloads; v1 handles this by keeping heavy runtime boundaries lazy and documenting the adapter policy.

What worked:

- Static deployment kept the security and operations surface small.
- A registry-driven lab model made twelve tools practical without duplicating UI scaffolding.

What did not:

- Full native parity with every named upstream engine is out of v1 scope.
- GitHub Pages cannot set COOP/COEP headers directly, so some advanced WASM/WebGPU paths need fallback handling.

Tech debt accepted:

- Current lab engines are classroom simulation adapters and probes, not complete upstream engine ports.
- IndexedDB/OPFS is documented as the future storage path; v1 uses localStorage for small state.

Next improvements:

1. Add real lazy-loaded WASM packages for the highest-value three tools.
2. Add teacher-authored lesson packs as static JSON.
3. Add screenshot-based visual regression checks.
