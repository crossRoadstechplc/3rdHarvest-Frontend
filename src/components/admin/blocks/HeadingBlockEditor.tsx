import type { CmsBlock } from "@/lib/cms/blocks";

type HeadingBlockEditorProps = {
  block: CmsBlock<"heading">;
  onChange: (nextData: CmsBlock<"heading">["data"]) => void;
};

export const HeadingBlockEditor = ({ block, onChange }: HeadingBlockEditorProps) => {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className="admin-label">Heading text</label>
        <input
          aria-label={`Heading text ${block.id}`}
          value={block.data.text}
          onChange={(event) => onChange({ ...block.data, text: event.target.value })}
          className="admin-input mt-1"
        />
      </div>

      <div>
        <label className="admin-label">Heading level</label>
        <select
          aria-label={`Heading level ${block.id}`}
          value={String(block.data.level)}
          onChange={(event) => {
            const levelValue = Number(event.target.value);
            const safeLevel = levelValue === 2 || levelValue === 3 || levelValue === 4 ? levelValue : 2;
            onChange({ ...block.data, level: safeLevel });
          }}
          className="admin-select mt-1"
        >
          <option value="2">H2</option>
          <option value="3">H3</option>
          <option value="4">H4</option>
        </select>
      </div>
    </div>
  );
};

