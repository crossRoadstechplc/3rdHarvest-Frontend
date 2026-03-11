import type { CmsBlockType } from "@/lib/cms/blocks";

type BlockToolbarProps = {
  onAddBlock: (type: CmsBlockType) => void;
};

const ACTIONS: Array<{ type: CmsBlockType; label: string }> = [
  { type: "heading", label: "Heading" },
  { type: "paragraph", label: "Paragraph" },
  { type: "image", label: "Image" },
  { type: "video", label: "Video" },
  { type: "quote", label: "Quote" },
  { type: "divider", label: "Divider" },
  { type: "linkCard", label: "Link Card" },
];

export const BlockToolbar = ({ onAddBlock }: BlockToolbarProps) => {
  return (
    <div className="space-y-2 rounded-[10px] border border-black/10 bg-white p-3" data-testid="block-toolbar-shell">
      <p className="text-xs uppercase tracking-[0.12em] text-bloomDarkCoffee/58">Quick Add Blocks</p>
      <div className="flex flex-wrap gap-2" role="toolbar" aria-label="Block actions" data-testid="block-toolbar">
        {ACTIONS.map((action) => (
          <button
            key={action.type}
            type="button"
            onClick={() => onAddBlock(action.type)}
            className="admin-button-secondary rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.08em]"
          >
            Add {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};
