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
});
