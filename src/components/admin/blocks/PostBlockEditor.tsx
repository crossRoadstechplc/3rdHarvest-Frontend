import { BlockList } from "@/components/admin/blocks/BlockList";
import { BlockToolbar } from "@/components/admin/blocks/BlockToolbar";
import {
  createBlock,
  normalizeAndSortBlocks,
  type CmsBlock,
  type CmsBlockType,
} from "@/lib/cms/blocks";

type PostBlockEditorProps = {
  token: string;
  postId?: string | number;
  onUnauthorized?: () => void;
  blocks: CmsBlock[];
  onChange: (updatedBlocks: CmsBlock[]) => void;
};

function normalizeWithSequentialOrder(blocks: CmsBlock[]): CmsBlock[] {
  return normalizeAndSortBlocks(
    blocks.map((block, index) => ({
      ...block,
      order: index,
    }))
  );
}

export const PostBlockEditor = ({
  token,
  postId,
  onUnauthorized,
  blocks,
  onChange,
}: PostBlockEditorProps) => {
  const applyBlocks = (nextBlocks: CmsBlock[]) => {
    onChange(normalizeWithSequentialOrder(nextBlocks));
  };

  const handleAddBlock = (type: CmsBlockType) => {
    applyBlocks([...blocks, createBlock(type, { order: blocks.length })]);
  };

  const handleUpdateBlock = (index: number, block: CmsBlock) => {
    const next = [...blocks];
    next[index] = block;
    applyBlocks(next);
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    const next = [...blocks];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    applyBlocks(next);
  };

  const handleMoveDown = (index: number) => {
    if (index >= blocks.length - 1) return;
    const next = [...blocks];
    [next[index], next[index + 1]] = [next[index + 1], next[index]];
    applyBlocks(next);
  };

  const handleRemove = (index: number) => {
    applyBlocks(blocks.filter((_, idx) => idx !== index));
  };

  return (
    <section className="admin-panel-soft space-y-4 p-4" data-testid="post-block-editor">
      <div className="space-y-1">
        <h4 className="font-serif text-lg font-semibold text-bloomDarkCoffee">Content Blocks</h4>
        <p className="text-sm text-bloomDarkCoffee/65">
          Compose post content using modular blocks, including direct image and video uploads.
        </p>
      </div>

      <BlockList
        blocks={blocks}
        token={token}
        postId={postId}
        onUnauthorized={onUnauthorized}
        onUpdateBlock={handleUpdateBlock}
        onMoveUp={handleMoveUp}
        onMoveDown={handleMoveDown}
        onRemove={handleRemove}
      />
      <BlockToolbar onAddBlock={handleAddBlock} />
    </section>
  );
};
