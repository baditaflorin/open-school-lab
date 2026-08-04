import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("Open School Lab app", () => {
  it("renders and switches labs", async () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /put the lab/i }),
    ).toBeInTheDocument();
    await userEvent.click(
      screen.getByRole("button", { name: /Molecule Viewer/i }),
    );
    expect(
      screen.getByRole("heading", { name: /Molecule Viewer/i }),
    ).toBeInTheDocument();
  });

  it("resets control values instead of leaking the previous lab's state", async () => {
    // Regression test: switching from Circuit Bench (controls: voltage,
    // resistance, capacitance) to Motion Sandbox (controls: velocity,
    // angle, gravity) used to reuse the same GenericLab instance without
    // remounting it, so the new lab's sliders read `values.velocity`
    // etc. from a state object that only had the old lab's keys. That
    // produced blank sliders and "NaN" metrics for every lab switch.
    render(<App />);
    await userEvent.click(
      screen.getByRole("button", { name: /Motion Sandbox/i }),
    );

    expect(
      screen.getByRole("heading", { name: /Motion Sandbox/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Launch velocity: 24 m\/s/i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/NaN/i)).not.toBeInTheDocument();
  });
});
