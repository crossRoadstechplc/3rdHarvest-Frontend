import type { CmsBlock } from "@/lib/cms/blocks";

type QuoteBlockEditorProps = {
  block: CmsBlock<"quote">;
  onChange: (nextData: CmsBlock<"quote">["data"]) => void;
};

export const QuoteBlockEditor = ({ block, onChange }: QuoteBlockEditorProps) => {
  return (
    <div className="grid gap-3">
      <div>
        <label className="admin-label">Quote text</label>
        <textarea
          aria-label={`Quote text ${block.id}`}
          value={block.data.quote}
          onChange={(event) => onChange({ ...block.data, quote: event.target.value })}
          rows={4}
          className="admin-textarea mt-1"
        />
      </div>
      <div>
        <label className="admin-label">Citation</label>
        <input
          aria-label={`Quote citation ${block.id}`}
          value={block.data.attribution}
          onChange={(event) => onChange({ ...block.data, attribution: event.target.value })}
          className="admin-input mt-1"
        />
      </div>
    </div>
  );
};

