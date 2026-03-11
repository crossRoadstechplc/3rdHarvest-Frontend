import type { CmsBlock } from "@/lib/cms/blocks";

type DividerBlockEditorProps = {
  block: CmsBlock<"divider">;
};

export const DividerBlockEditor = ({ block }: DividerBlockEditorProps) => {
  return (
    <div className="space-y-2" data-testid={`divider-preview-${block.id}`}>
      <p className="text-sm text-bloomDarkCoffee/65">Divider block</p>
      <hr className="border-t border-black/15" />
    </div>
  );
};

