const KEY = "open-school-lab-state";

export type PersistedState = {
  activeLab: string;
  updatedAt: string;
};

export function loadState(): PersistedState | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PersistedState) : null;
  } catch {
    return null;
  }
}

export function saveState(state: PersistedState): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Storage can be unavailable or throw (private browsing, blocked
    // third-party storage in an embedded classroom/LMS iframe, quota
    // errors). Losing the "last selected lab" preference is harmless;
    // letting the exception escape the effect is not — with no error
    // boundary in the app shell it unmounts the whole React tree and
    // leaves students with a blank page.
  }
}

export function downloadJSON(filename: string, value: unknown): void {
  const blob = new Blob([JSON.stringify(value, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
