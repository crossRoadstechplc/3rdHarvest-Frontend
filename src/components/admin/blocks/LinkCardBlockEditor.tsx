import type { CmsBlock } from "@/lib/cms/blocks";

type LinkCardBlockEditorProps = {
  block: CmsBlock<"linkCard">;
  onChange: (nextData: CmsBlock<"linkCard">["data"]) => void;
};

export const LinkCardBlockEditor = ({ block, onChange }: LinkCardBlockEditorProps) => {
  return (
    <div className="grid gap-3">
      <div>
        <label className="admin-label">URL</label>
        <input
          aria-label={`LinkCard url ${block.id}`}
          value={block.data.url}
          onChange={(event) => onChange({ ...block.data, url: event.target.value })}
          className="admin-input mt-1"
        />
      </div>
      <div>
        <label className="admin-label">Title</label>
        <input
          aria-label={`LinkCard title ${block.id}`}
          value={block.data.title}
          onChange={(event) => onChange({ ...block.data, title: event.target.value })}
          className="admin-input mt-1"
        />
      </div>
      <div>
        <label className="admin-label">Description</label>
        <textarea
          aria-label={`LinkCard description ${block.id}`}
          value={block.data.description}
          onChange={(event) => onChange({ ...block.data, description: event.target.value })}
          rows={3}
          className="admin-textarea mt-1"
        />
      </div>
    </div>
  );
};

