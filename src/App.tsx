import { useEffect, useMemo, useState } from "react";
import { Beaker, Gauge, WifiOff } from "lucide-react";
import {
  defaultLabId,
  getLab,
  LabRenderer,
  labs,
  type LabId,
} from "./features/labs/labRegistry";
import { loadState, saveState } from "./lib/storage";

function App() {
  const persisted = typeof window === "undefined" ? null : loadState();
  const [activeLab, setActiveLab] = useState<LabId>(
    (persisted?.activeLab as LabId) ?? defaultLabId,
  );
  const lab = useMemo(() => getLab(activeLab), [activeLab]);

  useEffect(() => {
    saveState({ activeLab, updatedAt: new Date().toISOString() });
  }, [activeLab]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            <Beaker size={22} />
          </div>
          <div>
            <strong>Open School Lab</strong>
            <span>Static virtual labs for under-equipped classrooms</span>
          </div>
        </div>
        <div className="topbar-meta" aria-label="App status">
          <span className="pill">
            <WifiOff size={14} /> Offline-ready
          </span>
          <span className="pill">
            <Gauge size={14} /> Lazy engines
          </span>
        </div>
      </header>
      <main className="workspace">
        <aside className="sidebar">
          <div className="intro">
            <h1>Lesson labs, no equipment closet required.</h1>
            <p>
              Twelve focused simulation and visualization workbenches aligned to
              classroom prompts, exportable as evidence of learning.
            </p>
          </div>
          <nav className="tool-list" aria-label="Lab tools">
            {labs.map((candidate) => {
              const Icon = candidate.icon;
              return (
                <button
                  type="button"
                  className={`tool-button ${candidate.id === activeLab ? "active" : ""}`}
                  key={candidate.id}
                  onClick={() => setActiveLab(candidate.id)}
                >
                  <span
                    className="tool-icon"
                    style={{ background: candidate.color }}
                  >
                    <Icon size={18} />
                  </span>
                  <span>
                    <span className="tool-title">{candidate.title}</span>
                    <span className="tool-engine">{candidate.engine}</span>
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>
        <section className="lab-stage">
          <div className="hero-band" aria-label="Project overview">
            <div className="hero-copy">
              <h2>Put the lab on every browser.</h2>
              <p>
                Mode A GitHub Pages delivery keeps the public surface static
                while students run experiments locally through browser APIs,
                JavaScript adapters, and lazy WASM boundaries.
              </p>
            </div>
            <div className="lab-visual" aria-hidden="true">
              <svg viewBox="0 0 640 420">
                <path
                  d="M40 280 C150 80 220 360 330 160 S520 100 600 260"
                  fill="none"
                  stroke="#126b5c"
                  strokeWidth="10"
                />
                <path
                  d="M70 330 H570"
                  stroke="#17211c"
                  strokeOpacity="0.55"
                  strokeWidth="4"
                />
                <circle
                  cx="170"
                  cy="160"
                  r="46"
                  fill="#b7801f"
                  opacity="0.85"
                />
                <circle
                  cx="430"
                  cy="135"
                  r="30"
                  fill="#b6422f"
                  opacity="0.85"
                />
                <rect
                  x="105"
                  y="270"
                  width="112"
                  height="78"
                  rx="8"
                  fill="#fffdf7"
                  stroke="#17211c"
                />
                <rect
                  x="382"
                  y="244"
                  width="148"
                  height="100"
                  rx="8"
                  fill="#fffdf7"
                  stroke="#17211c"
                />
                <path
                  d="M130 310 h64 M410 285 h92 M410 315 h56"
                  stroke="#315f9f"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <LabRenderer lab={lab} />
        </section>
      </main>
    </div>
  );
}

export default App;
