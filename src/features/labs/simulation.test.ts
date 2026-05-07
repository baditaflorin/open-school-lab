import { describe, expect, it } from "vitest";
import { defaultValues, simulate } from "./simulation";
import { getLab, labs } from "./labRegistry";

describe("lab registry", () => {
  it("ships at least twelve lesson tools", () => {
    expect(labs.length).toBeGreaterThanOrEqual(12);
  });

  it("simulates the circuit lesson with measurable output", () => {
    const lab = getLab("circuits");
    const output = simulate(lab, defaultValues(lab));
    expect(output.metrics[0].value).toContain("mA");
    expect(output.series.length).toBeGreaterThan(40);
  });
});
