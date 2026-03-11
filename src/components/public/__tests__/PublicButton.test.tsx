import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PublicButton } from "@/components/public/PublicButton";

describe("PublicButton", () => {
  it("renders primary variant classes", () => {
    render(<PublicButton>Primary</PublicButton>);
    const button = screen.getByRole("button", { name: "Primary" });

    expect(button).toBeInTheDocument();
    expect(button.className).toContain("bg-bloomGreen");
  });

  it("renders secondary variant classes", () => {
    render(<PublicButton variant="secondary">Secondary</PublicButton>);
    const button = screen.getByRole("button", { name: "Secondary" });

    expect(button.className).toContain("border-bloomGreen/25");
  });
});
