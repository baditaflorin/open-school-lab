import { describe, expect, it } from "vitest";
import { saveState } from "./storage";

describe("saveState", () => {
  it("does not throw when localStorage.setItem fails", () => {
    // Regression test: window.localStorage.setItem can throw in real
    // classroom conditions (Safari private browsing, storage blocked
    // inside an LMS iframe, quota errors). saveState() is called from a
    // useEffect with no error boundary around the app shell, so an
    // uncaught exception here used to unmount the whole React tree and
    // leave students with a blank page.
    const original = Object.getOwnPropertyDescriptor(window, "localStorage");
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: {
        setItem: () => {
          throw new Error("storage blocked");
        },
      },
    });

    try {
      expect(() =>
        saveState({
          activeLab: "circuits",
          updatedAt: new Date().toISOString(),
        }),
      ).not.toThrow();
    } finally {
      if (original) {
        Object.defineProperty(window, "localStorage", original);
      }
    }
  });
});
