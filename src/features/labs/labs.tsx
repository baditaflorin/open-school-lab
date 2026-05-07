import { useMemo, useState } from "react";
import { Download, Play, RotateCcw } from "lucide-react";
import type { LabDefinition } from "./labRegistry";
import { defaultValues, simulate } from "./simulation";
import { downloadJSON } from "../../lib/storage";

export function GenericLab({ lab }: { lab: LabDefinition }) {
  const [values, setValues] = useState(() => defaultValues(lab));
  const [toast, setToast] = useState("");
  const output = useMemo(() => simulate(lab, values), [lab, values]);

  function updateValue(key: string, next: number) {
    setValues((current) => ({ ...current, [key]: next }));
  }

  function reset() {
    setValues(defaultValues(lab));
    setToast("Activity reset to the lesson starting point.");
  }

  function exportRun() {
    downloadJSON(`${lab.id}-run.json`, {
      lab: lab.id,
      values,
      output,
      exportedAt: new Date().toISOString(),
    });
    setToast("Run exported as JSON.");
  }

  return (
    <section aria-labelledby={`${lab.id}-title`}>
      <div className="tool-header">
        <div>
          <div className="panel-eyebrow">
            {lab.subject} / {lab.lesson}
          </div>
          <h2 id={`${lab.id}-title`}>{lab.title}</h2>
          <p>{lab.description}</p>
        </div>
        <span className="pill">{lab.engine}</span>
      </div>
      <div className="tool-grid">
        <aside className="control-panel" aria-label={`${lab.title} controls`}>
          <h3 className="panel-title">Experiment controls</h3>
          <div className="control-stack">
            {lab.controls.map((control) => (
              <div className="field" key={control.key}>
                <label htmlFor={`${lab.id}-${control.key}`}>
                  {control.label}: {values[control.key]}
                  {control.unit ? ` ${control.unit}` : ""}
                </label>
                <input
                  id={`${lab.id}-${control.key}`}
                  type="range"
                  min={control.min}
                  max={control.max}
                  step={control.step}
                  value={values[control.key]}
                  onChange={(event) =>
                    updateValue(control.key, Number(event.currentTarget.value))
                  }
                />
              </div>
            ))}
            <div className="button-row">
              <button
                className="command"
                type="button"
                onClick={() => setToast(output.status)}
              >
                <Play size={17} /> Run
              </button>
              <button
                className="command secondary"
                type="button"
                onClick={reset}
              >
                <RotateCcw size={17} /> Reset
              </button>
              <button
                className="command secondary"
                type="button"
                onClick={exportRun}
              >
                <Download size={17} /> Export
              </button>
            </div>
            <p className="status-line">{output.status}</p>
          </div>
        </aside>
        <div className="output-panel">
          <div className="results-grid">
            {output.metrics.map((metric) => (
              <div className="metric" key={metric.label}>
                <strong>{metric.value}</strong>
                <span>
                  {metric.label} / {metric.detail}
                </span>
              </div>
            ))}
          </div>
          <LabPlot lab={lab} points={output.series} values={values} />
        </div>
      </div>
      <div className="lesson-panel">
        <h3 className="panel-title">Lesson sequence</h3>
        <ol>
          {lab.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
      {toast ? (
        <div
          className="toast"
          role="status"
          onAnimationEnd={() => setToast("")}
        >
          {toast}
        </div>
      ) : null}
    </section>
  );
}

function LabPlot({
  lab,
  points,
  values,
}: {
  lab: LabDefinition;
  points: Array<{ x: number; y: number }>;
  values: Record<string, number>;
}) {
  const path = points
    .map(
      (point, index) =>
        `${index === 0 ? "M" : "L"} ${point.x * 720} ${300 - point.y * 240}`,
    )
    .join(" ");
  const Icon = lab.icon;
  const seeds = Array.from({ length: 18 }, (_, index) => ({
    x:
      40 + ((index * 67 + Math.round(Object.values(values)[0] ?? 0) * 7) % 640),
    y:
      38 + ((index * 43 + Math.round(Object.values(values)[1] ?? 0) * 5) % 250),
    r: 4 + (index % 5) * 2,
  }));

  return (
    <svg
      className="plot"
      viewBox="0 0 720 320"
      role="img"
      aria-label={`${lab.title} visualization`}
    >
      <defs>
        <linearGradient id={`${lab.id}-fill`} x1="0" x2="1">
          <stop offset="0" stopColor={lab.color} stopOpacity="0.16" />
          <stop offset="1" stopColor="#b7801f" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      <rect width="720" height="320" fill={`url(#${lab.id}-fill)`} />
      {lab.kind === "network"
        ? seeds
            .slice(0, 9)
            .map((seed, index) => (
              <line
                key={`edge-${seed.x}`}
                x1={seed.x}
                y1={seed.y}
                x2={seeds[(index + 3) % seeds.length].x}
                y2={seeds[(index + 3) % seeds.length].y}
                stroke={lab.color}
                strokeOpacity="0.45"
                strokeWidth="2"
              />
            ))
        : null}
      {lab.kind === "particles" ||
      lab.kind === "image" ||
      lab.kind === "network"
        ? seeds.map((seed) => (
            <circle
              key={`${seed.x}-${seed.y}`}
              cx={seed.x}
              cy={seed.y}
              r={seed.r}
              fill={lab.color}
              opacity="0.72"
            />
          ))
        : null}
      {lab.kind === "field"
        ? seeds.map((seed, index) => (
            <rect
              key={`${seed.x}-${seed.y}`}
              x={seed.x}
              y={seed.y}
              width={seed.r * 3}
              height={seed.r * 3}
              rx="3"
              fill={index % 2 ? lab.color : "#b7801f"}
              opacity="0.62"
              transform={`rotate(${(values.phase ?? values.twist ?? 0) / 2} ${seed.x} ${seed.y})`}
            />
          ))
        : null}
      {lab.kind === "score"
        ? [70, 120, 170, 220].map((y) => (
            <line
              key={y}
              x1="60"
              x2="660"
              y1={y}
              y2={y}
              stroke="#17211c"
              strokeWidth="2"
            />
          ))
        : null}
      {lab.kind === "score"
        ? seeds
            .slice(0, 10)
            .map((seed, index) => (
              <ellipse
                key={seed.x}
                cx={80 + index * 54}
                cy={110 + (index % 4) * 28}
                rx="13"
                ry="9"
                fill={lab.color}
              />
            ))
        : null}
      <path
        d={path}
        fill="none"
        stroke={lab.color}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d={`${path} L 720 300 L 0 300 Z`} fill={lab.color} opacity="0.08" />
      <g transform="translate(26 24)">
        <rect width="46" height="46" rx="8" fill="#fffdf7" stroke="#d8ddd1" />
        <foreignObject x="11" y="11" width="24" height="24">
          <Icon size={24} />
        </foreignObject>
      </g>
    </svg>
  );
}
