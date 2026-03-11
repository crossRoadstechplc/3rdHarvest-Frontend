import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useState } from "react";
import { PostBlockEditor } from "@/components/admin/blocks/PostBlockEditor";
import { createBlock, type CmsBlock } from "@/lib/cms/blocks";

type HarnessProps = {
  initialBlocks: CmsBlock[];
  onChangeSpy?: (blocks: CmsBlock[]) => void;
};

const Harness = ({ initialBlocks, onChangeSpy }: HarnessProps) => {
  const [blocks, setBlocks] = useState(initialBlocks);

  return (
    <PostBlockEditor
      token="admin-token"
      blocks={blocks}
      onChange={(nextBlocks) => {
        onChangeSpy?.(nextBlocks);
        setBlocks(nextBlocks);
      }}
    />
  );
};

function setRichText(element: HTMLElement, html: string) {
  element.innerHTML = html;
  fireEvent.input(element);
}

describe("PostBlockEditor", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders existing blocks", () => {
    render(
      <Harness
        initialBlocks={[
          createBlock("heading", { order: 0, data: { text: "Existing heading", level: 2 } }),
          createBlock("paragraph", { order: 1, data: { text: "Existing paragraph" } }),
        ]}
      />
    );

    expect(screen.getByDisplayValue("Existing heading")).toBeInTheDocument();
    expect(screen.getByText("Existing paragraph")).toBeInTheDocument();
  });

  it("adding a block updates output", () => {
    const onChangeSpy = vi.fn();
    render(<Harness initialBlocks={[]} onChangeSpy={onChangeSpy} />);

    fireEvent.click(screen.getByRole("button", { name: "Add Quote" }));

    expect(screen.getByText("Quote Block")).toBeInTheDocument();
    expect(onChangeSpy).toHaveBeenCalled();
    const updated = onChangeSpy.mock.calls[onChangeSpy.mock.calls.length - 1]?.[0] as CmsBlock[];
    expect(updated.some((block) => block.type === "quote")).toBe(true);
  });

  it("removing a block updates output", () => {
    render(
      <Harness
        initialBlocks={[
          createBlock("heading", { order: 0 }),
          createBlock("paragraph", { order: 1 }),
        ]}
      />
    );

    const firstCard = screen.getByTestId("block-card-0");
    fireEvent.click(within(firstCard).getByRole("button", { name: "Remove" }));

    expect(screen.queryByText("Heading Block")).not.toBeInTheDocument();
    expect(screen.getByText("Paragraph Block")).toBeInTheDocument();
  });

  it("moving blocks up/down updates order", () => {
    render(
      <Harness
        initialBlocks={[
          createBlock("heading", { order: 0, data: { text: "H", level: 2 } }),
          createBlock("paragraph", { order: 1, data: { text: "P" } }),
        ]}
      />
    );

    fireEvent.click(within(screen.getByTestId("block-card-0")).getByRole("button", { name: "Move down" }));

    expect(screen.getByTestId("block-card-0")).toHaveTextContent("Paragraph Block");
    expect(screen.getByTestId("block-card-1")).toHaveTextContent("Heading Block");
  });

  it("heading block editor updates text and level", () => {
    render(
      <Harness
        initialBlocks={[createBlock("heading", { order: 0, data: { text: "Initial", level: 2 } })]}
      />
    );

    fireEvent.change(screen.getByLabelText(/Heading text/i), { target: { value: "Updated heading" } });
    fireEvent.change(screen.getByLabelText(/Heading level/i), { target: { value: "3" } });

    expect(screen.getByDisplayValue("Updated heading")).toBeInTheDocument();
    expect(screen.getByLabelText(/Heading level/i)).toHaveValue("3");
  });

  it("paragraph block editor updates content", () => {
    render(
      <Harness initialBlocks={[createBlock("paragraph", { order: 0, data: { text: "Initial paragraph" } })]} />
    );

    const editor = screen.getByLabelText(/Paragraph rich text/i);
    setRichText(editor, "<p>Updated paragraph</p>");
    expect(screen.getByText("Updated paragraph")).toBeInTheDocument();
  });

  it("quote block editor updates text and cite", () => {
    render(
      <Harness
        initialBlocks={[
          createBlock("quote", { order: 0, data: { quote: "Initial quote", attribution: "Initial cite" } }),
        ]}
      />
    );

    fireEvent.change(screen.getByLabelText(/Quote text/i), { target: { value: "Updated quote" } });
    fireEvent.change(screen.getByLabelText(/Quote citation/i), { target: { value: "Updated cite" } });

    expect(screen.getByDisplayValue("Updated quote")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Updated cite")).toBeInTheDocument();
  });

  it("linkCard block editor updates url/title/description", () => {
    render(
      <Harness
        initialBlocks={[
          createBlock("linkCard", {
            order: 0,
            data: { url: "https://example.com", title: "Initial title", description: "Initial description" },
          }),
        ]}
      />
    );

    fireEvent.change(screen.getByLabelText(/LinkCard url/i), { target: { value: "https://updated.com" } });
    fireEvent.change(screen.getByLabelText(/LinkCard title/i), { target: { value: "Updated title" } });
    fireEvent.change(screen.getByLabelText(/LinkCard description/i), {
      target: { value: "Updated description" },
    });

    expect(screen.getByDisplayValue("https://updated.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Updated title")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Updated description")).toBeInTheDocument();
  });

  it("calls parent onChange with valid ordered blocks", () => {
    const onChangeSpy = vi.fn();
    render(
      <Harness
        onChangeSpy={onChangeSpy}
        initialBlocks={[
          createBlock("heading", { order: 0 }),
          createBlock("paragraph", { order: 1 }),
          createBlock("quote", { order: 2 }),
        ]}
      />
    );

    fireEvent.click(within(screen.getByTestId("block-card-2")).getByRole("button", { name: "Move up" }));

    const updated = onChangeSpy.mock.calls[onChangeSpy.mock.calls.length - 1]?.[0] as CmsBlock[];
    expect(updated).toHaveLength(3);
    expect(updated.map((block) => block.order)).toEqual([0, 1, 2]);
  });
});
