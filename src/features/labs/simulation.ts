import type { LabDefinition } from "./labRegistry";

export type SimulationResult = {
  values: Record<string, number>;
  metrics: Array<{ label: string; value: string; detail: string }>;
  series: Array<{ x: number; y: number }>;
  status: string;
  webgpuSupported?: boolean;
};

export function defaultValues(lab: LabDefinition): Record<string, number> {
  return Object.fromEntries(
    lab.controls.map((control) => [control.key, control.value]),
  );
}

export function simulate(
  lab: LabDefinition,
  values: Record<string, number>,
): SimulationResult {
  const a = first(values);
  const b = second(values);
  const c = third(values);
  const series = Array.from({ length: 72 }, (_, index) => {
    const x = index / 71;
    const wave =
      Math.sin(x * Math.PI * 2 * (1 + Math.abs(a % 7))) *
      (0.35 + b / (maxValue(values) * 3));
    const curve = (x - 0.5) * (c / (maxValue(values) || 1));
    return { x, y: clamp01(0.5 + wave * 0.32 + curve * 0.38) };
  });

  switch (lab.id) {
    case "circuits": {
      const current = values.voltage / values.resistance;
      const cutoff =
        1 / (2 * Math.PI * values.resistance * values.capacitance * 0.000001);
      const energy = 0.5 * values.capacitance * 0.000001 * values.voltage ** 2;
      return result(values, lab, series, [
        ["Current", `${(current * 1000).toFixed(2)} mA`, "I = V/R"],
        ["Cutoff", `${cutoff.toFixed(1)} Hz`, "1 / 2πRC"],
        [
          "Stored energy",
          `${(energy * 1000).toFixed(3)} mJ`,
          "capacitor charge",
        ],
      ]);
    }
    case "symbolic": {
      const d = values.b ** 2 - 4 * values.a * values.c;
      return result(values, lab, parabola(values.a, values.b, values.c), [
        ["Discriminant", d.toFixed(2), "b² - 4ac"],
        ["Vertex x", (-values.b / (2 * values.a || 1)).toFixed(2), "-b / 2a"],
        ["Real roots", d >= 0 ? "yes" : "no", "root test"],
      ]);
    }
    case "physics": {
      const radians = (values.angle * Math.PI) / 180;
      const time = (2 * values.velocity * Math.sin(radians)) / values.gravity;
      const range = values.velocity * Math.cos(radians) * time;
      const peak =
        (values.velocity ** 2 * Math.sin(radians) ** 2) / (2 * values.gravity);
      return result(
        values,
        lab,
        projectile(values.velocity, radians, values.gravity),
        [
          ["Range", `${range.toFixed(1)} m`, "horizontal travel"],
          ["Peak", `${peak.toFixed(1)} m`, "maximum height"],
          ["Flight time", `${time.toFixed(2)} s`, "landing time"],
        ],
      );
    }
    case "webgpu": {
      const supported = typeof navigator !== "undefined" && "gpu" in navigator;
      return result(
        values,
        lab,
        series,
        [
          ["Elements", String(values.threads * values.items), "parallel lanes"],
          [
            "Ops estimate",
            `${Math.round((values.threads * values.items * values.passes) / 1000)}k`,
            "model only",
          ],
          [
            "GPU support",
            supported ? "available" : "fallback",
            "browser probe",
          ],
        ],
        supported,
      );
    }
    default:
      return result(values, lab, series, genericMetrics(lab, values));
  }
}

function result(
  values: Record<string, number>,
  lab: LabDefinition,
  series: Array<{ x: number; y: number }>,
  metrics: Array<[string, string, string]>,
  webgpuSupported?: boolean,
): SimulationResult {
  return {
    values,
    metrics: metrics.map(([label, value, detail]) => ({
      label,
      value,
      detail,
    })),
    series,
    webgpuSupported,
    status: `${lab.engine} lesson adapter ready. Heavy runtime is lazy-loaded behind this activity boundary.`,
  };
}

function genericMetrics(
  lab: LabDefinition,
  values: Record<string, number>,
): Array<[string, string, string]> {
  const keys = Object.keys(values);
  const sum = keys.reduce((total, key) => total + values[key], 0);
  const spread =
    Math.max(...Object.values(values)) - Math.min(...Object.values(values));
  return [
    [lab.metrics[0], formatNumber(sum / keys.length), "classroom model"],
    [lab.metrics[1], formatNumber(spread), "parameter spread"],
    [lab.metrics[2], formatNumber((sum * spread) / 10), "derived index"],
  ];
}

function parabola(a: number, b: number, c: number) {
  const raw = Array.from({ length: 80 }, (_, index) => {
    const x = -4 + index * 0.1;
    return { x: index / 79, y: a * x * x + b * x + c };
  });
  const min = Math.min(...raw.map((p) => p.y));
  const max = Math.max(...raw.map((p) => p.y));
  return raw.map((p) => ({
    x: p.x,
    y: clamp01((p.y - min) / (max - min || 1)),
  }));
}

function projectile(velocity: number, radians: number, gravity: number) {
  const time = (2 * velocity * Math.sin(radians)) / gravity;
  const raw = Array.from({ length: 80 }, (_, index) => {
    const t = (index / 79) * time;
    return {
      x: index / 79,
      y: velocity * Math.sin(radians) * t - 0.5 * gravity * t ** 2,
    };
  });
  const max = Math.max(...raw.map((p) => p.y), 1);
  return raw.map((p) => ({ x: p.x, y: clamp01(p.y / max) }));
}

function first(values: Record<string, number>) {
  return Object.values(values)[0] ?? 1;
}

function second(values: Record<string, number>) {
  return Object.values(values)[1] ?? 1;
}

function third(values: Record<string, number>) {
  return Object.values(values)[2] ?? 1;
}

function maxValue(values: Record<string, number>) {
  return Math.max(...Object.values(values), 1);
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function formatNumber(value: number) {
  if (value >= 1000) return Math.round(value).toLocaleString();
  if (value >= 10) return value.toFixed(1);
  return value.toFixed(2);
}
