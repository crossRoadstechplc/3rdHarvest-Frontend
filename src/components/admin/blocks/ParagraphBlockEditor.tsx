import { useEffect, useMemo, useRef } from "react";
import type { CmsBlock } from "@/lib/cms/blocks";

type ParagraphBlockEditorProps = {
  block: CmsBlock<"paragraph">;
  onChange: (nextData: CmsBlock<"paragraph">["data"]) => void;
};

const TEXT_COMMANDS = [
  { label: "Bold", command: "bold" },
  { label: "Italic", command: "italic" },
  { label: "UL", command: "insertUnorderedList" },
  { label: "OL", command: "insertOrderedList" },
] as const;

export const ParagraphBlockEditor = ({ block, onChange }: ParagraphBlockEditorProps) => {
  const editorRef = useRef<HTMLDivElement | null>(null);

  const initialHtml = useMemo(() => {
    const value = block.data.text || "";
    if (!value.trim()) {
      return "<p></p>";
    }

    return value;
  }, [block.data.text]);

  useEffect(() => {
    if (!editorRef.current) return;
    if (editorRef.current.innerHTML === initialHtml) return;
    editorRef.current.innerHTML = initialHtml;
  }, [initialHtml]);

  const commitChange = () => {
    if (!editorRef.current) return;
    onChange({
      ...block.data,
      text: editorRef.current.innerHTML,
    });
  };

  const runCommand = (command: string) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    if (typeof document !== "undefined" && typeof document.execCommand === "function") {
      document.execCommand(command);
      commitChange();
    }
  };

  return (
    <div className="space-y-2">
      <label className="admin-label">Paragraph content</label>
      <div className="rounded-[10px] border border-black/15 bg-white">
        <div className="flex flex-wrap gap-2 border-b border-black/10 p-2">
          {TEXT_COMMANDS.map((item) => (
            <button
              key={item.command}
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => runCommand(item.command)}
              className="admin-button-secondary px-2.5 py-1 text-[11px] uppercase tracking-[0.08em]"
            >
              {item.label}
            </button>
          ))}
        </div>
        <div
          ref={editorRef}
          aria-label={`Paragraph rich text ${block.id}`}
          role="textbox"
          contentEditable
          suppressContentEditableWarning
          onInput={commitChange}
          className="min-h-[140px] p-3 text-sm leading-relaxed text-bloomDarkCoffee focus:outline-none
          [&_p]:mb-3 [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:pl-6"
        />
      </div>
      <p className="text-xs text-bloomDarkCoffee/60">
        Rich text supports bold, italic, and lists. Paragraph content is saved as HTML.
      </p>
    </div>
  );
};
