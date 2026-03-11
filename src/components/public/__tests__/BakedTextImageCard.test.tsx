import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BakedTextImageCard } from "@/components/public/BakedTextImageCard";

describe("BakedTextImageCard", () => {
  it("renders image and text overlay structure", () => {
    render(
      <BakedTextImageCard
        imageUrl="https://example.com/photo.jpg"
        imageAlt="Coffee landscape"
        title="Field story"
        description="Documentary content"
        eyebrow="Insights"
      />
    );

    expect(screen.getByRole("img", { name: "Coffee landscape" })).toBeInTheDocument();
    expect(screen.getByText("Field story")).toBeInTheDocument();
    expect(screen.getByText("Documentary content")).toBeInTheDocument();
    expect(screen.getByTestId("baked-text-overlay")).toBeInTheDocument();
    expect(screen.getByTestId("baked-text-content")).toBeInTheDocument();
    expect(screen.getByTestId("baked-text-overlay").className).toContain("bg-gradient-to-t");
    expect(screen.getByRole("article").className).toContain("aspect-[2/3]");
  });
});
