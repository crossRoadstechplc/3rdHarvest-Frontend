import type { PropsWithChildren } from "react";

type BlockCardProps = PropsWithChildren<{
  title: string;
  index: number;
  total: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
}>;

export const BlockCard = ({
  title,
  index,
  total,
  onMoveUp,
  onMoveDown,
  onRemove,
  children,
}: BlockCardProps) => {
  return (
    <article className="admin-panel-soft space-y-3 p-3 sm:p-4" data-testid={`block-card-${index}`}>
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="font-serif text-base sm:text-lg font-semibold text-bloomDarkCoffee">{title}</h4>
          <p className="text-[11px] uppercase tracking-[0.12em] text-bloomDarkCoffee/55">
            Block {index + 1} of {total}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={index === 0}
            className="admin-button-secondary w-full sm:w-auto px-2.5 py-1.5 text-xs disabled:opacity-50"
          >
            Move up
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={index >= total - 1}
            className="admin-button-secondary w-full sm:w-auto px-2.5 py-1.5 text-xs disabled:opacity-50"
          >
            Move down
          </button>
          <button type="button" onClick={onRemove} className="admin-button-danger w-full sm:w-auto px-2.5 py-1.5 text-xs">
            Remove
          </button>
        </div>
      </div>

      {children}
    </article>
  );
};
