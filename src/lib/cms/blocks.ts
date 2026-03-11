export const CMS_BLOCK_TYPES = [
  "heading",
  "paragraph",
  "image",
  "video",
  "quote",
  "divider",
  "linkCard",
] as const;

export type CmsBlockType = (typeof CMS_BLOCK_TYPES)[number];

type HeadingBlockData = {
  text: string;
  level: 2 | 3 | 4;
};

type ParagraphBlockData = {
  text: string;
};

type ImageBlockData = {
  url: string;
  alt: string;
  caption: string;
};

type VideoBlockData = {
  url: string;
  caption: string;
};

type QuoteBlockData = {
  quote: string;
  attribution: string;
};

type DividerBlockData = {
  style: "line";
};

type LinkCardBlockData = {
  title: string;
  description: string;
  url: string;
};

export type CmsBlockDataMap = {
  heading: HeadingBlockData;
  paragraph: ParagraphBlockData;
  image: ImageBlockData;
  video: VideoBlockData;
  quote: QuoteBlockData;
  divider: DividerBlockData;
  linkCard: LinkCardBlockData;
};

type CmsBlockBase<T extends CmsBlockType> = {
  id: string;
  type: T;
  order: number;
  data: CmsBlockDataMap[T];
};

type CmsBlockUnion = {
  [K in CmsBlockType]: CmsBlockBase<K>;
}[CmsBlockType];

export type CmsBlock<T extends CmsBlockType = CmsBlockType> = T extends CmsBlockType ? CmsBlockBase<T> : never;

const DEFAULT_BLOCK_DATA: {
  [K in CmsBlockType]: CmsBlockDataMap[K];
} = {
  heading: { text: "", level: 2 },
  paragraph: { text: "" },
  image: { url: "", alt: "", caption: "" },
  video: { url: "", caption: "" },
  quote: { quote: "", attribution: "" },
  divider: { style: "line" },
  linkCard: { title: "", description: "", url: "" },
};

function createBlockId(type: CmsBlockType): string {
  const random = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  return `${type}-${random}`;
}

export function getDefaultBlockData<T extends CmsBlockType>(type: T): CmsBlockDataMap[T] {
  return { ...DEFAULT_BLOCK_DATA[type] };
}

export function createBlock<T extends CmsBlockType>(
  type: T,
  options?: {
    id?: string;
    order?: number;
    data?: Partial<CmsBlockDataMap[T]>;
  }
): CmsBlock<T> {
  return {
    id: options?.id ?? createBlockId(type),
    type,
    order: options?.order ?? 0,
    data: {
      ...getDefaultBlockData(type),
      ...(options?.data ?? {}),
    } as CmsBlockDataMap[T],
  } as CmsBlock<T>;
}

export function normalizeAndSortBlocks(
  blocks: Array<
    | {
        id?: string;
        type?: CmsBlockType;
        order?: number;
        data?: Partial<CmsBlockDataMap[CmsBlockType]>;
      }
    | null
    | undefined
  >
): CmsBlock[] {
  return blocks
    .filter((block): block is { id?: string; type: CmsBlockType; order?: number; data?: Partial<CmsBlockDataMap[CmsBlockType]> } =>
      Boolean(block && block.type)
    )
    .map((block, index) => {
      const type = block.type;
      return createBlock(type, {
        id: typeof block.id === "string" ? block.id : undefined,
        order: typeof block.order === "number" ? block.order : index,
        data: (block.data as Partial<CmsBlockDataMap[typeof type]>) ?? {},
      });
    })
    .sort((a, b) => a.order - b.order);
}
