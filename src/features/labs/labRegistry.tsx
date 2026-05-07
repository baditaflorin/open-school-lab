import type { ComponentType } from "react";
import {
  Atom,
  Binary,
  CircuitBoard,
  Dna,
  Gamepad2,
  Grid3X3,
  Image,
  Music,
  Network,
  Sigma,
  Workflow,
} from "lucide-react";
import { GenericLab } from "./labs";

export type LabId =
  | "circuits"
  | "geometry"
  | "symbolic"
  | "molecules"
  | "physics"
  | "microscopy"
  | "chemistry"
  | "music"
  | "graphs"
  | "creative"
  | "tracking"
  | "webgpu";

export type LabDefinition = {
  id: LabId;
  title: string;
  engine: string;
  subject: string;
  lesson: string;
  description: string;
  icon: ComponentType<{ size?: number }>;
  color: string;
  controls: Array<{
    key: string;
    label: string;
    min: number;
    max: number;
    step: number;
    value: number;
    unit: string;
  }>;
  metrics: [string, string, string];
  steps: string[];
  kind: "wave" | "field" | "network" | "particles" | "image" | "score";
};

export const labs: LabDefinition[] = [
  {
    id: "circuits",
    title: "Circuit Bench",
    engine: "ngspice + Spice3 WASM adapter",
    subject: "Physics",
    lesson: "RC filters and Ohm law",
    description:
      "Build a classroom-safe virtual bench for voltage, resistance, and frequency sweeps.",
    icon: CircuitBoard,
    color: "#126b5c",
    controls: [
      {
        key: "voltage",
        label: "Source voltage",
        min: 1,
        max: 12,
        step: 0.5,
        value: 5,
        unit: "V",
      },
      {
        key: "resistance",
        label: "Resistance",
        min: 100,
        max: 2000,
        step: 100,
        value: 1000,
        unit: "ohm",
      },
      {
        key: "capacitance",
        label: "Capacitance",
        min: 1,
        max: 20,
        step: 1,
        value: 10,
        unit: "uF",
      },
    ],
    metrics: ["Current", "Cutoff", "Stored energy"],
    steps: [
      "Set a 5 V source.",
      "Double resistance and observe current.",
      "Raise capacitance and compare cutoff.",
    ],
    kind: "wave",
  },
  {
    id: "geometry",
    title: "Mesh Studio",
    engine: "libigl WASM adapter",
    subject: "Geometry",
    lesson: "Surface area and normals",
    description:
      "Inspect a triangulated shape and reason about mesh density, curvature, and area.",
    icon: Grid3X3,
    color: "#7b4fa3",
    controls: [
      {
        key: "segments",
        label: "Mesh segments",
        min: 4,
        max: 40,
        step: 2,
        value: 18,
        unit: "",
      },
      {
        key: "height",
        label: "Peak height",
        min: 1,
        max: 10,
        step: 0.5,
        value: 4,
        unit: "cm",
      },
      {
        key: "twist",
        label: "Twist",
        min: 0,
        max: 180,
        step: 5,
        value: 35,
        unit: "deg",
      },
    ],
    metrics: ["Faces", "Area", "Mean slope"],
    steps: [
      "Start with a low segment count.",
      "Raise the peak height.",
      "Explain why area changes faster than height.",
    ],
    kind: "field",
  },
  {
    id: "symbolic",
    title: "Pyodide Math Notebook",
    engine: "SymPy + SciPy + matplotlib via Pyodide",
    subject: "Math + Data",
    lesson: "Quadratics, roots, and plotted signals",
    description:
      "Manipulate symbolic coefficients and connect exact roots to plotted numerical behavior.",
    icon: Sigma,
    color: "#b7801f",
    controls: [
      {
        key: "a",
        label: "a coefficient",
        min: -4,
        max: 4,
        step: 0.5,
        value: 1,
        unit: "",
      },
      {
        key: "b",
        label: "b coefficient",
        min: -8,
        max: 8,
        step: 0.5,
        value: -3,
        unit: "",
      },
      {
        key: "c",
        label: "c coefficient",
        min: -8,
        max: 8,
        step: 0.5,
        value: 2,
        unit: "",
      },
    ],
    metrics: ["Discriminant", "Vertex x", "Real roots"],
    steps: [
      "Set coefficients for two real roots.",
      "Make the discriminant zero.",
      "Predict the vertex before reading it.",
    ],
    kind: "wave",
  },
  {
    id: "molecules",
    title: "Molecule Viewer",
    engine: "3Dmol.js wrapper",
    subject: "Chemistry",
    lesson: "Bond geometry",
    description:
      "Rotate a molecular model proxy and connect geometry to polarity and bonding.",
    icon: Dna,
    color: "#22865f",
    controls: [
      {
        key: "atoms",
        label: "Atom count",
        min: 3,
        max: 18,
        step: 1,
        value: 8,
        unit: "",
      },
      {
        key: "bond",
        label: "Bond length",
        min: 1,
        max: 3,
        step: 0.1,
        value: 1.4,
        unit: "A",
      },
      {
        key: "angle",
        label: "Bond angle",
        min: 70,
        max: 180,
        step: 5,
        value: 109,
        unit: "deg",
      },
    ],
    metrics: ["Bonds", "Span", "Polarity proxy"],
    steps: [
      "Compare 90 and 109 degree angles.",
      "Increase bond length.",
      "Explain how shape affects polarity.",
    ],
    kind: "particles",
  },
  {
    id: "physics",
    title: "Motion Sandbox",
    engine: "Phaser physics wrapper",
    subject: "Physics",
    lesson: "Projectile motion",
    description:
      "Launch a virtual object and inspect how velocity and gravity shape its path.",
    icon: Gamepad2,
    color: "#556b2f",
    controls: [
      {
        key: "velocity",
        label: "Launch velocity",
        min: 5,
        max: 50,
        step: 1,
        value: 24,
        unit: "m/s",
      },
      {
        key: "angle",
        label: "Launch angle",
        min: 10,
        max: 80,
        step: 1,
        value: 42,
        unit: "deg",
      },
      {
        key: "gravity",
        label: "Gravity",
        min: 1,
        max: 18,
        step: 0.5,
        value: 9.8,
        unit: "m/s2",
      },
    ],
    metrics: ["Range", "Peak", "Flight time"],
    steps: [
      "Find the angle with maximum range.",
      "Double gravity.",
      "Compare peak height and time.",
    ],
    kind: "wave",
  },
  {
    id: "microscopy",
    title: "Microscopy Workbench",
    engine: "ImageJ-style processing",
    subject: "Biology",
    lesson: "Image thresholding",
    description:
      "Threshold synthetic microscopy fields and count visible objects without a microscope.",
    icon: Image,
    color: "#8f4f2a",
    controls: [
      {
        key: "threshold",
        label: "Threshold",
        min: 10,
        max: 90,
        step: 1,
        value: 54,
        unit: "%",
      },
      {
        key: "contrast",
        label: "Contrast",
        min: 1,
        max: 10,
        step: 0.5,
        value: 4,
        unit: "x",
      },
      {
        key: "objects",
        label: "Object density",
        min: 4,
        max: 40,
        step: 1,
        value: 18,
        unit: "",
      },
    ],
    metrics: ["Count", "Coverage", "Mean intensity"],
    steps: [
      "Raise threshold until faint cells vanish.",
      "Increase contrast.",
      "Discuss false positives.",
    ],
    kind: "image",
  },
  {
    id: "chemistry",
    title: "Reaction Builder",
    engine: "Open Babel adapter",
    subject: "Chemistry",
    lesson: "Mass conservation",
    description:
      "Balance reaction-like quantities and show molecular mass before a wet lab exists.",
    icon: Atom,
    color: "#2f6f91",
    controls: [
      {
        key: "reactantA",
        label: "Reactant A",
        min: 1,
        max: 12,
        step: 1,
        value: 2,
        unit: "mol",
      },
      {
        key: "reactantB",
        label: "Reactant B",
        min: 1,
        max: 12,
        step: 1,
        value: 5,
        unit: "mol",
      },
      {
        key: "yield",
        label: "Yield",
        min: 20,
        max: 100,
        step: 5,
        value: 80,
        unit: "%",
      },
    ],
    metrics: ["Limiting mol", "Product", "Leftover"],
    steps: [
      "Change reactant ratios.",
      "Identify the limiting reagent.",
      "Lower yield and explain product loss.",
    ],
    kind: "particles",
  },
  {
    id: "music",
    title: "Notation Lab",
    engine: "LilyPond adapter",
    subject: "Music",
    lesson: "Rhythm fractions",
    description:
      "Connect note duration, tempo, and measure structure with a rendered score preview.",
    icon: Music,
    color: "#6d5b98",
    controls: [
      {
        key: "tempo",
        label: "Tempo",
        min: 60,
        max: 180,
        step: 5,
        value: 100,
        unit: "bpm",
      },
      {
        key: "notes",
        label: "Notes per bar",
        min: 2,
        max: 12,
        step: 1,
        value: 4,
        unit: "",
      },
      {
        key: "swing",
        label: "Swing",
        min: 0,
        max: 60,
        step: 5,
        value: 15,
        unit: "%",
      },
    ],
    metrics: ["Beat time", "Bar time", "Syncopation"],
    steps: [
      "Change tempo.",
      "Increase notes per bar.",
      "Explain how swing changes timing.",
    ],
    kind: "score",
  },
  {
    id: "graphs",
    title: "Graph Explorer",
    engine: "GraphViz WASM adapter",
    subject: "Computer Science",
    lesson: "Directed graphs",
    description:
      "Create graph structures and observe how edges, paths, and centrality change.",
    icon: Network,
    color: "#455a64",
    controls: [
      {
        key: "nodes",
        label: "Nodes",
        min: 3,
        max: 20,
        step: 1,
        value: 9,
        unit: "",
      },
      {
        key: "edges",
        label: "Edges",
        min: 2,
        max: 38,
        step: 1,
        value: 14,
        unit: "",
      },
      {
        key: "flow",
        label: "Flow weight",
        min: 1,
        max: 10,
        step: 1,
        value: 4,
        unit: "",
      },
    ],
    metrics: ["Density", "Components", "Avg degree"],
    steps: [
      "Start sparse.",
      "Add edges.",
      "Find when the graph feels connected.",
    ],
    kind: "network",
  },
  {
    id: "creative",
    title: "Creative Coding",
    engine: "p5.js wrapper",
    subject: "Art + Math",
    lesson: "Parametric patterns",
    description:
      "Use sliders to create generative patterns tied to trigonometry and iteration.",
    icon: Workflow,
    color: "#a04462",
    controls: [
      {
        key: "frequency",
        label: "Frequency",
        min: 1,
        max: 12,
        step: 1,
        value: 5,
        unit: "",
      },
      {
        key: "amplitude",
        label: "Amplitude",
        min: 10,
        max: 90,
        step: 5,
        value: 55,
        unit: "px",
      },
      {
        key: "phase",
        label: "Phase",
        min: 0,
        max: 360,
        step: 5,
        value: 90,
        unit: "deg",
      },
    ],
    metrics: ["Loops", "Span", "Symmetry"],
    steps: [
      "Set frequency to 3.",
      "Move phase.",
      "Describe rotational symmetry.",
    ],
    kind: "field",
  },
  {
    id: "tracking",
    title: "Motion Tracker",
    engine: "tracker.js browser vision",
    subject: "Physics",
    lesson: "Video motion analysis",
    description:
      "Track a synthetic marker across frames and calculate velocity from position samples.",
    icon: Binary,
    color: "#8a6f2f",
    controls: [
      {
        key: "speed",
        label: "Marker speed",
        min: 1,
        max: 20,
        step: 1,
        value: 8,
        unit: "px/f",
      },
      {
        key: "frames",
        label: "Frames",
        min: 8,
        max: 60,
        step: 1,
        value: 24,
        unit: "",
      },
      {
        key: "jitter",
        label: "Tracking jitter",
        min: 0,
        max: 10,
        step: 0.5,
        value: 2,
        unit: "px",
      },
    ],
    metrics: ["Mean velocity", "Uncertainty", "Samples"],
    steps: [
      "Raise jitter.",
      "Increase frames.",
      "Explain why more samples help.",
    ],
    kind: "wave",
  },
  {
    id: "webgpu",
    title: "Compute Lab",
    engine: "WebGPU compute probe",
    subject: "Computer Science",
    lesson: "Parallel arrays",
    description:
      "Run a browser capability probe and model parallel compute workloads.",
    icon: Binary,
    color: "#1f6f8b",
    controls: [
      {
        key: "threads",
        label: "Workgroups",
        min: 1,
        max: 64,
        step: 1,
        value: 16,
        unit: "",
      },
      {
        key: "items",
        label: "Items per group",
        min: 16,
        max: 512,
        step: 16,
        value: 128,
        unit: "",
      },
      {
        key: "passes",
        label: "Passes",
        min: 1,
        max: 20,
        step: 1,
        value: 6,
        unit: "",
      },
    ],
    metrics: ["Elements", "Ops estimate", "GPU support"],
    steps: [
      "Change workgroup count.",
      "Increase passes.",
      "Check whether this browser exposes WebGPU.",
    ],
    kind: "field",
  },
];

export const defaultLabId: LabId = "circuits";

export function getLab(id: string): LabDefinition {
  return labs.find((lab) => lab.id === id) ?? labs[0];
}

export function LabRenderer({ lab }: { lab: LabDefinition }) {
  return <GenericLab lab={lab} />;
}
