import { BlockCard } from "@/components/admin/blocks/BlockCard";
import { DividerBlockEditor } from "@/components/admin/blocks/DividerBlockEditor";
import { HeadingBlockEditor } from "@/components/admin/blocks/HeadingBlockEditor";
import { ImageBlockEditor } from "@/components/admin/blocks/ImageBlockEditor";
import { LinkCardBlockEditor } from "@/components/admin/blocks/LinkCardBlockEditor";
import { ParagraphBlockEditor } from "@/components/admin/blocks/ParagraphBlockEditor";
import { QuoteBlockEditor } from "@/components/admin/blocks/QuoteBlockEditor";
import { VideoBlockEditor } from "@/components/admin/blocks/VideoBlockEditor";
import type { CmsBlock } from "@/lib/cms/blocks";

type BlockListProps = {
  blocks: CmsBlock[];
  token: string;
  postId?: string | number;
  onUnauthorized?: () => void;
  onUpdateBlock: (index: number, block: CmsBlock) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onRemove: (index: number) => void;
};

function getBlockTitle(block: CmsBlock): string {
  switch (block.type) {
    case "heading":
      return "Heading Block";
    case "paragraph":
      return "Paragraph Block";
    case "image":
      return "Image Block";
    case "video":
      return "Video Block";
    case "quote":
      return "Quote Block";
    case "divider":
      return "Divider Block";
    case "linkCard":
      return "Link Card Block";
    default:
      return "Block";
  }
}

export const BlockList = ({
  blocks,
  token,
  postId,
  onUnauthorized,
  onUpdateBlock,
  onMoveUp,
  onMoveDown,
  onRemove,
}: BlockListProps) => {
  if (blocks.length === 0) {
    return (
      <div className="admin-empty">
        <p className="font-medium text-bloomDarkCoffee/80">No blocks added yet.</p>
        <p className="mt-1 text-xs">Use the add-block buttons above to start composing this post.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3" data-testid="block-list">
      {blocks.map((block, index) => (
        <BlockCard
          key={block.id}
          title={getBlockTitle(block)}
          index={index}
          total={blocks.length}
          onMoveUp={() => onMoveUp(index)}
          onMoveDown={() => onMoveDown(index)}
          onRemove={() => onRemove(index)}
        >
          {block.type === "heading" ? (
            <HeadingBlockEditor
              block={block}
              onChange={(data) => onUpdateBlock(index, { ...block, data })}
            />
          ) : null}

          {block.type === "paragraph" ? (
            <ParagraphBlockEditor
              block={block}
              onChange={(data) => onUpdateBlock(index, { ...block, data })}
            />
          ) : null}

          {block.type === "quote" ? (
            <QuoteBlockEditor
              block={block}
              onChange={(data) => onUpdateBlock(index, { ...block, data })}
            />
          ) : null}

          {block.type === "divider" ? <DividerBlockEditor block={block} /> : null}

          {block.type === "linkCard" ? (
            <LinkCardBlockEditor
              block={block}
              onChange={(data) => onUpdateBlock(index, { ...block, data })}
            />
          ) : null}

          {block.type === "image" ? (
            <ImageBlockEditor
              block={block}
              token={token}
              postId={postId}
              onUnauthorized={onUnauthorized}
              onChange={(data) => onUpdateBlock(index, { ...block, data })}
            />
          ) : null}

          {block.type === "video" ? (
            <VideoBlockEditor
              block={block}
              token={token}
              postId={postId}
              onUnauthorized={onUnauthorized}
              onChange={(data) => onUpdateBlock(index, { ...block, data })}
            />
          ) : null}
        </BlockCard>
      ))}
    </div>
  );
};
