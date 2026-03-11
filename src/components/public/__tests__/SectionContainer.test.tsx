import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SectionContainer } from "@/components/public/SectionContainer";

describe("SectionContainer", () => {
  it("renders children", () => {
    render(
      <SectionContainer>
        <p>Section child content</p>
      </SectionContainer>
    );

    expect(screen.getByText("Section child content")).toBeInTheDocument();
  });
});
