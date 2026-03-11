import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LogoStripShell } from "@/components/public/LogoStripShell";

describe("LogoStripShell", () => {
  it("renders expected logo strip structure", () => {
    render(
      <LogoStripShell title="Partners">
        <div>Logo A</div>
        <div>Logo B</div>
      </LogoStripShell>
    );

    expect(screen.getByText("Partners")).toBeInTheDocument();
    expect(screen.getByTestId("logo-strip-shell")).toBeInTheDocument();
    expect(screen.getByTestId("logo-strip-row")).toBeInTheDocument();
    expect(screen.getByTestId("logo-strip-row").className).toContain("flex-wrap");
    expect(screen.getByText("Logo A")).toBeInTheDocument();
    expect(screen.getByText("Logo B")).toBeInTheDocument();
  });
});
