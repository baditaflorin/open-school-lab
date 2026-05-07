# Architecture

Open School Lab is a static Mode A browser application deployed on GitHub Pages.

```mermaid
flowchart TB
  subgraph "GitHub Pages Boundary"
    A["index.html and hashed assets"]
    B["React + TypeScript app shell"]
    C["features/labs registry"]
    D["Twelve lesson UIs"]
    E["Service worker"]
  end
  F["localStorage now; IndexedDB/OPFS later"] --- D
  G["Lazy JS/WASM/browser adapters"] --- D
  A --> B --> C --> D
  E --> A
```

Module boundaries:

- `src/features/labs/` owns lab metadata, simulations, and the shared workbench UI.
- `src/lib/` owns shared browser utilities.
- `public/` owns PWA assets copied into the Pages build.
- `docs/` contains authored documentation plus generated Pages output.
